import axios from "axios";

interface AnalyzeRequest {
  question: string;
}

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8001";

export const analyzeQuestion = async (data: AnalyzeRequest) => {
  const response = await axios.post(`${AI_SERVICE_URL}/api/v1/ai/analyze`, {
    question: data.question,
  });

  return response.data;
};
