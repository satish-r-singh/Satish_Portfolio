import { useState, useRef, useCallback } from 'react';

interface UseSpeechRecognitionOptions {
    onResult?: (transcript: string) => void;
    onLog?: (message: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
}

interface UseSpeechRecognitionReturn {
    isListening: boolean;
    startListening: () => void;
    stopListening: () => void;
    toggleListening: () => void;
}

export const useSpeechRecognition = ({
    onResult,
    onLog,
    onStart,
    onEnd
}: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const log = useCallback((msg: string) => {
        onLog?.(msg);
    }, [onLog]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    }, []);

    const startListening = useCallback(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice input is not supported in this browser. Please use Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsListening(true);
            onStart?.();
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            log(`> SPEECH_DETECTED: "${transcript}"`);
            onResult?.(transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
            onEnd?.();
        };

        recognitionRef.current = recognition;
        recognition.start();
    }, [log, onResult, onStart, onEnd]);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        startListening,
        stopListening,
        toggleListening
    };
};
