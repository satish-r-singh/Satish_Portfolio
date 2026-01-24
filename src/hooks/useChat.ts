import { useState, useRef, useCallback, useEffect } from 'react';
import { API_URL } from '../constants';

type SystemState = 'IDLE' | 'PROCESSING' | 'SPEAKING' | 'LISTENING';

interface UseChatOptions {
    onAudioResponse?: (text: string) => void;
    initialLogs?: string[];
}

interface UseChatReturn {
    input: string;
    setInput: (value: string) => void;
    response: string | null;
    setResponse: (value: string | null) => void;
    consoleLogs: string[];
    isLoading: boolean;
    systemState: SystemState;
    setSystemState: (state: SystemState) => void;
    addLog: (message: string) => void;
    processQuery: (queryText: string) => Promise<void>;
    handleFileUpload: (file: File) => Promise<void>;
    handleClear: () => void;
    consoleContainerRef: React.RefObject<HTMLDivElement>;
}

export const useChat = ({
    onAudioResponse,
    initialLogs = ['> SYSTEM_READY...', '> WAITING_FOR_INPUT_SIGNAL...']
}: UseChatOptions = {}): UseChatReturn => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [consoleLogs, setConsoleLogs] = useState<string[]>(initialLogs);
    const [isLoading, setIsLoading] = useState(false);
    const [systemState, setSystemState] = useState<SystemState>('IDLE');

    const consoleContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll console
    useEffect(() => {
        if (consoleContainerRef.current) {
            consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
        }
    }, [consoleLogs, response, isLoading]);

    const addLog = useCallback((msg: string) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        setConsoleLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
    }, []);

    const determineTool = (text: string): string => {
        const t = text.toLowerCase();
        if (t.includes('resume') || t.includes('job') || t.includes('hire') || t.includes('jd')) {
            return 'JD_MATCHER';
        }
        return 'RAG';
    };

    const processQuery = useCallback(async (queryText: string) => {
        if (!queryText || !queryText.trim()) return;

        setResponse(null);
        setIsLoading(true);
        setSystemState('PROCESSING');

        if (consoleLogs.length > 20) {
            setConsoleLogs(['> HISTORY_ARCHIVED...', '> INITIALIZING_NEW_QUERY...']);
        } else {
            addLog('> INITIALIZING_QUERY_SEQUENCE...');
        }

        addLog(`> INPUT_RECEIVED: "${queryText.substring(0, 20)}..."`);

        const tool = determineTool(queryText);
        setTimeout(() => {
            addLog(`> TOOL_SELECTED: ${tool}_PROTOCOL`);
        }, 500);

        try {
            if (tool === 'JD_MATCHER') addLog('> PARSING_CONTEXT_WINDOW...');

            const apiResponse = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: queryText, session_id: "guest_browser" }),
            });

            if (!apiResponse.ok) throw new Error(`Server Error: ${apiResponse.status}`);
            const data = await apiResponse.json();

            addLog('> RESPONSE_GENERATED_SUCCESSFULLY');
            setResponse(data.response);
            onAudioResponse?.(data.response);

        } catch (error) {
            addLog('⚠️ CRITICAL_ERROR: BACKEND_UNREACHABLE');
            setResponse("⚠️ ERROR: Neural Link Offline. Please check backend connection.");
        } finally {
            setIsLoading(false);
            setSystemState('IDLE');
        }
    }, [consoleLogs.length, addLog, onAudioResponse]);

    const handleFileUpload = useCallback(async (file: File) => {
        setResponse(null);
        setIsLoading(true);
        setSystemState('PROCESSING');
        setConsoleLogs(['> FILE_UPLOAD_DETECTED...']);

        setTimeout(() => {
            addLog(`> READING_FILE: ${file.name}`);
            addLog('> EXTRACTING_ENTITIES: SKILLS, EXPERIENCE, ROLES...');
        }, 500);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${API_URL}/analyze_jd`, { method: "POST", body: formData });
            const data = await res.json();

            addLog('> ANALYSIS_COMPLETE: GENERATING_REPORT...');
            setResponse(data.response);
            onAudioResponse?.(data.response);
        } catch (error) {
            addLog('⚠️ UPLOAD_ERROR: PARSING_FAILED');
            setResponse("⚠️ Error reading file.");
        } finally {
            setIsLoading(false);
            setSystemState('IDLE');
        }
    }, [addLog, onAudioResponse]);

    const handleClear = useCallback(() => {
        setResponse(null);
        setConsoleLogs(['> SYSTEM_READY...', '> WAITING_FOR_INPUT_SIGNAL...']);
        setSystemState('IDLE');
    }, []);

    return {
        input,
        setInput,
        response,
        setResponse,
        consoleLogs,
        isLoading,
        systemState,
        setSystemState,
        addLog,
        processQuery,
        handleFileUpload,
        handleClear,
        consoleContainerRef
    };
};
