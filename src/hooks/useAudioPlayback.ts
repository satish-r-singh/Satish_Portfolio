import { useState, useRef, useEffect, useCallback } from 'react';
import { API_URL } from '../constants';

interface UseAudioPlaybackOptions {
    initialEnabled?: boolean;
    onLog?: (message: string) => void;
}

interface UseAudioPlaybackReturn {
    isAudioOn: boolean;
    isPlaying: boolean;
    toggleAudio: (existingResponseText?: string) => void;
    stopAudio: () => void;
    playAudioResponse: (text: string) => Promise<void>;
    setSystemState: (state: 'IDLE' | 'SPEAKING') => void;
    systemState: 'IDLE' | 'SPEAKING';
}

export const useAudioPlayback = ({
    initialEnabled = false,
    onLog
}: UseAudioPlaybackOptions = {}): UseAudioPlaybackReturn => {
    const [isAudioOn, setIsAudioOn] = useState(initialEnabled);
    const [isPlaying, setIsPlaying] = useState(false);
    const [systemState, setSystemState] = useState<'IDLE' | 'SPEAKING'>('IDLE');

    const currentAudioRef = useRef<HTMLAudioElement | null>(null);
    const audioCache = useRef<{ text: string; url: string } | null>(null);
    const isAudioOnRef = useRef(isAudioOn);

    // Keep ref in sync
    useEffect(() => {
        isAudioOnRef.current = isAudioOn;
    }, [isAudioOn]);

    const log = useCallback((msg: string) => {
        onLog?.(msg);
    }, [onLog]);

    const stopAudio = useCallback(() => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setSystemState('IDLE');
    }, []);

    const playBlobUrl = useCallback((url: string) => {
        stopAudio();
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        setSystemState('SPEAKING');
        setIsPlaying(true);
        audio.play().catch(e => console.error("Playback failed:", e));
        audio.onended = () => {
            setIsPlaying(false);
            setSystemState('IDLE');
        };
    }, [stopAudio]);

    const playAudioResponse = useCallback(async (text: string, forceRefresh = false) => {
        if (!isAudioOnRef.current) return;

        // Check cache first - if we have audio for the same text, reuse it
        if (!forceRefresh && audioCache.current && audioCache.current.text === text) {
            log('> USING_CACHED_AUDIO');
            playBlobUrl(audioCache.current.url);
            return;
        }

        setSystemState('SPEAKING');
        log('> GENERATING_AUDIO... (this may take up to 20 seconds)');

        try {
            const res = await fetch(`${API_URL}/tts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const blob = await res.blob();
            const audioUrl = URL.createObjectURL(blob);
            audioCache.current = { text, url: audioUrl };
            playBlobUrl(audioUrl);
        } catch (error) {
            log("⚠️ TTS_ERROR: AUDIO_GENERATION_FAILED");
            setSystemState('IDLE');
        }
    }, [log, playBlobUrl]);

    const toggleAudio = useCallback((existingResponseText?: string) => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);
        isAudioOnRef.current = newState;
        log(newState ? '> AUDIO_OUTPUT_ENABLED' : '> AUDIO_OUTPUT_MUTED');

        if (!newState) {
            stopAudio();
        } else if (existingResponseText) {
            // If toggling ON and there's existing text, play it (will use cache if available)
            playAudioResponse(existingResponseText);
        }
    }, [isAudioOn, log, stopAudio, playAudioResponse]);

    return {
        isAudioOn,
        isPlaying,
        toggleAudio,
        stopAudio,
        playAudioResponse,
        setSystemState,
        systemState
    };
};
