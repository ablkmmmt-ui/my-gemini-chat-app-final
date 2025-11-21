// ... 您的所有 import 语句 ...

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // <-- 只保留这一行

// --- 1. 角色数据与人格设定 (Persona Data) ---
const TEACHERS = [
// ...

// --- 2. API Setup ---
const generateAIResponse = async (contact, history, userMessage) => {
    // ... 函数逻辑
