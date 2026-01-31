import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Leaf, Sparkles } from "lucide-react";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ProgressSteps from "@/components/chat/ProgressSteps";
import ChatInput from "@/components/chat/ChatInput";
import QuickOptions from "@/components/chat/QuickOptions";
import MentraReport from "@/components/report/MentraReport";
import GroupMembers from "@/components/community/GroupMembers";
import TATImage from "@/components/chat/TATImage";
import { useQuery } from "@tanstack/react-query";
import { createPageUrl } from "@/utils";

const PSYCHOMETRIC_QUESTIONS = {
  'postpartum-depression': [
    "Since becoming a parent, how often have you felt overwhelmed by your responsibilities?",
    "Do you find it difficult to bond with or feel connected to your baby?",
    "How often do you experience feelings of sadness or hopelessness about being a parent?"
  ],
  'anxiety-management': [
    "How often do you experience racing thoughts that are difficult to control?",
    "Do you frequently feel restless, on edge, or have difficulty relaxing?",
    "How much does worry interfere with your daily activities and concentration?"
  ],
  'workplace-stress': [
    "How often do you feel exhausted or drained due to work demands?",
    "Do you find it difficult to disconnect from work during personal time?",
    "How frequently do workplace conflicts or pressures affect your mood?"
  ]
};

export default function AssessmentPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState('basic-info');
  const [assessment, setAssessment] = useState(null);
  const [quickOptions, setQuickOptions] = useState(null);
  const [basicInfo, setBasicInfo] = useState({ age: null, gender: null });
  const [openEndedResponses, setOpenEndedResponses] = useState([]);
  const [probableGroups, setProbableGroups] = useState([]);
  const [psychometricScores, setPsychometricScores] = useState({});
  const [currentPsychQuestion, setCurrentPsychQuestion] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showTATImage, setShowTATImage] = useState(false);
  const [tatResponse, setTatResponse] = useState(null);
  const [reportData, setReportData] = useState(null);
  const messagesEndRef = useRef(null);

  const { data: groupMembers = [] } = useQuery({
    queryKey: ['groupMembers', assessment?.final_focus_group],
    queryFn: () => base44.entities.UserAssessment.filter({ 
      final_focus_group: assessment?.final_focus_group,
      status: 'completed'
    }),
    enabled: !!assessment?.final_focus_group && showCommunity
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    startConversation();
  }, []);

  const addBotMessage = async (message, delay = 800) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', content: message }]);
  };

  const startConversation = async () => {
    await addBotMessage("Hello, and welcome 🌿", 500);
    await addBotMessage("I'm here to help you find the right support. This is a safe, confidential space where you can share at your own pace.", 1200);
    await addBotMessage("Let's start by getting to know you a little. What's your age?", 1000);
    setQuickOptions([
      { label: "18-25", value: "21" },
      { label: "26-35", value: "30" },
      { label: "36-45", value: "40" },
      { label: "46-55", value: "50" },
      { label: "56+", value: "60" }
    ]);
  };

  const handleUserMessage = async (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setQuickOptions(null);

    if (stage === 'basic-info') {
      if (!basicInfo.age) {
        setBasicInfo(prev => ({ ...prev, age: parseInt(message) }));
        await addBotMessage("Thank you for sharing that with me. 💜");
        await addBotMessage("How do you identify?", 800);
        setQuickOptions([
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
          { label: "Non-binary", value: "non-binary" },
          { label: "Prefer not to say", value: "prefer-not-to-say" }
        ]);
      } else {
        setBasicInfo(prev => ({ ...prev, gender: message }));
        setStage('open-ended');
        await addBotMessage("It's lovely to meet you. 🌸");
        await addBotMessage("Now, I'd like to hear more about how you've been feeling. There are no right or wrong answers here—just share whatever feels comfortable.", 1200);
        await addBotMessage("So tell me... how have you been lately?", 1000);
      }
    } else if (stage === 'open-ended') {
      setOpenEndedResponses(prev => [...prev, message]);
      
      if (openEndedResponses.length === 0) {
        await addBotMessage("I appreciate you opening up. That takes courage. 💚");
        await addBotMessage("Is there anything specific that's been weighing on your mind? Perhaps something at work, at home, or with your health?", 1200);
      } else if (openEndedResponses.length === 1) {
        await addBotMessage("Thank you for sharing that with me. I'm here to listen. 🌷");
        await addBotMessage("One more question: What brings you here today? What kind of support are you hoping to find?", 1200);
      } else if (openEndedResponses.length === 2) {
        await addBotMessage("I really appreciate your openness. 💜");
        await addBotMessage("Now I'd like to try something a little different. I'm going to show you an image, and I'd love to hear what story or feelings come to mind when you look at it. There's no right or wrong answer—just share whatever comes naturally.", 1500);
        setShowTATImage(true);
        setMessages(prev => [...prev, { role: 'tat', imageIndex: 0 }]);
      } else if (openEndedResponses.length === 3) {
        setTatResponse(message);
        setShowTATImage(false);
        setStage('narrowing');
        await analyzeResponses([...openEndedResponses, message]);
      }
    } else if (stage === 'psychometric') {
      const score = parseInt(message);
      const currentGroup = probableGroups[Math.floor(currentPsychQuestion / 3)] || probableGroups[0];
      
      setPsychometricScores(prev => ({
        ...prev,
        [currentGroup]: (prev[currentGroup] || 0) + score
      }));

      const totalQuestions = probableGroups.length * 3;
      const nextQuestion = currentPsychQuestion + 1;

      if (nextQuestion < totalQuestions) {
        setCurrentPsychQuestion(nextQuestion);
        const groupIndex = Math.floor(nextQuestion / 3);
        const questionIndex = nextQuestion % 3;
        const nextGroup = probableGroups[groupIndex] || probableGroups[0];
        
        await addBotMessage("Thank you for your honesty. 💜");
        await addBotMessage(PSYCHOMETRIC_QUESTIONS[nextGroup][questionIndex], 800);
        setQuickOptions([
          { label: "Rarely", value: "1" },
          { label: "Sometimes", value: "2" },
          { label: "Often", value: "3" },
          { label: "Very Often", value: "4" }
        ]);
      } else {
        await completeAssessment();
      }
    }
  };

  const analyzeResponses = async (responses) => {
    setIsTyping(true);
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a compassionate mental health assessment assistant. Based on the following user responses, identify the TWO most probable focus groups they may belong to.

User Information:
- Age: ${basicInfo.age}
- Gender: ${basicInfo.gender}

Their responses to open-ended questions:
1. "How have you been lately?" - "${responses[0]}"
2. "Is there anything specific weighing on your mind?" - "${responses[1]}"
3. "What kind of support are you hoping to find?" - "${responses[2]}"
4. TAT (Thematic Apperception Test) Response - When shown an ambiguous image and asked to describe what story or feelings come to mind: "${responses[3] || 'Not provided'}"

The TAT response is particularly valuable for understanding unconscious concerns, emotional themes, and underlying psychological patterns. Pay special attention to:
- Themes of isolation, overwhelm, or helplessness (may indicate depression)
- Themes of conflict, pressure, or being trapped (may indicate workplace stress)  
- Themes of worry, danger, or uncertainty (may indicate anxiety)
- Themes related to caregiving, babies, or parental roles (may indicate postpartum concerns)

Available focus groups:
- postpartum-depression: For new parents experiencing emotional difficulties, feelings of inadequacy, bonding issues, or overwhelming stress related to parenthood
- anxiety-management: For those experiencing racing thoughts, constant worry, restlessness, difficulty relaxing, or panic symptoms
- workplace-stress: For those dealing with job burnout, work-life balance issues, workplace conflicts, or career-related anxiety

Analyze their responses carefully and determine which TWO focus groups are most likely relevant to their situation.`,
      response_json_schema: {
        type: "object",
        properties: {
          probable_groups: {
            type: "array",
            items: { type: "string", enum: ["postpartum-depression", "anxiety-management", "workplace-stress"] },
            description: "The two most probable focus groups, ordered by likelihood"
          },
          reasoning: {
            type: "string",
            description: "Brief explanation of why these groups were chosen"
          }
        },
        required: ["probable_groups", "reasoning"]
      }
    });

    setIsTyping(false);
    
    const groups = result.probable_groups.slice(0, 2);
    setProbableGroups(groups);
    
    await addBotMessage("Thank you for sharing all of that with me. I can see you're going through a lot, and I want you to know that seeking support is a sign of strength. 🌟");
    await addBotMessage("Based on what you've shared, I'd like to ask a few more specific questions to better understand your needs. These will help me connect you with the most supportive group.", 1200);
    
    setStage('psychometric');
    await addBotMessage(PSYCHOMETRIC_QUESTIONS[groups[0]][0], 1000);
    setQuickOptions([
      { label: "Rarely", value: "1" },
      { label: "Sometimes", value: "2" },
      { label: "Often", value: "3" },
      { label: "Very Often", value: "4" }
    ]);
  };

  const completeAssessment = async () => {
    setStage('completed');
    setIsTyping(true);
    
    let finalGroup = probableGroups[0];
    let maxScore = psychometricScores[probableGroups[0]] || 0;
    
    probableGroups.forEach(group => {
      if ((psychometricScores[group] || 0) > maxScore) {
        maxScore = psychometricScores[group] || 0;
        finalGroup = group;
      }
    });

    // Get user messages for sentiment analysis
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
    
    // Generate comprehensive Mentra report with sentiment analysis
    const mentraReportResult = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a clinical AI system generating a MENTRA THERAPY INTAKE & HANDOFF REPORT. Analyze the following conversation and provide comprehensive psychological insights with sentiment analysis.

User Profile:
- Age: ${basicInfo.age}
- Gender: ${basicInfo.gender}
- Final Focus Group: ${finalGroup}

User's Messages (in order):
${userMessages.map((msg, i) => `${i + 1}. "${msg}"`).join('\n')}

Open-ended responses:
1. "How have you been lately?" - "${openEndedResponses[0]}"
2. "Is there anything specific weighing on your mind?" - "${openEndedResponses[1]}"
3. "What kind of support are you hoping to find?" - "${openEndedResponses[2]}"
4. TAT Response: "${openEndedResponses[3] || tatResponse || 'Not provided'}"

Psychometric Scores: ${JSON.stringify(psychometricScores)}

Generate a complete Mentra report with the following:

1. SENTIMENT ANALYSIS: Analyze the emotional tone of EACH user message and track how it changes throughout the conversation. Identify:
   - Overall dominant emotions (sadness, anxiety, hope, frustration, etc.)
   - Emotional progression (did they become more open? More hopeful? More distressed?)
   - Key emotional phrases or words
   - Role classification based on their communication style

2. CONVERSATION SUMMARY: 4-5 line summary including engagement style, core themes, and tone progression

3. EMOTION TRAJECTORY: Create data points for a chart showing emotional positivity (0-100) and stability (0-100) at each stage:
   - Stage 1: Initial contact
   - Stage 2: Sharing feelings
   - Stage 3: Deep sharing
   - Stage 4: TAT response
   - Stage 5: Assessment completion

4. ESI (Emotion Stability Index): 0-100 score with insight
5. TRI (Therapeutic Readiness Index): 0-100 score with insight
6. BLS (Behavioral Loop Strength): 0-100 score indicating repetitive thought/behavior patterns
7. GSP (Group Synergy Predictor): 0-100 score predicting how well they'll connect with group

8. RISK ASSESSMENT: Identify any concerning phrases, risk level (low/moderate/high), and nature of risk

Respond with compassion while being clinically accurate.`,
      response_json_schema: {
        type: "object",
        properties: {
          sentimentAnalysis: {
            type: "object",
            properties: {
              dominantEmotions: { type: "array", items: { type: "string" } },
              emotionalProgression: { type: "string" },
              keyPhrases: { type: "array", items: { type: "string" } },
              roleClassification: { type: "string" },
              confidenceLevel: { type: "number" },
              messageEmotions: { 
                type: "array", 
                items: { 
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    emotion: { type: "string" },
                    intensity: { type: "number" }
                  }
                }
              }
            }
          },
          conversationSummary: { type: "string" },
          emotionTrajectory: {
            type: "object",
            properties: {
              chartData: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    stage: { type: "string" },
                    positivity: { type: "number" },
                    stability: { type: "number" }
                  }
                }
              },
              esi: { type: "number" },
              esiInsight: { type: "string" },
              tri: { type: "number" },
              triInsight: { type: "string" }
            }
          },
          behavioralSnapshot: {
            type: "object",
            properties: {
              bls: { type: "number" },
              blsInsight: { type: "string" },
              gsp: { type: "number" },
              gspInsight: { type: "string" }
            }
          },
          riskSummary: {
            type: "object",
            properties: {
              riskLevel: { type: "string" },
              natureOfRisk: { type: "string" },
              alertPhrases: { type: "array", items: { type: "string" } },
              transparencyScore: { type: "number" }
            }
          }
        }
      }
    });

    const newAssessment = await base44.entities.UserAssessment.create({
      age: basicInfo.age,
      gender: basicInfo.gender,
      conversation_history: messages,
      probable_groups: probableGroups,
      final_focus_group: finalGroup,
      psychometric_scores: psychometricScores,
      assessment_stage: 'completed',
      psych_report: mentraReportResult.conversationSummary,
      status: 'completed'
    });

    setAssessment(newAssessment);
    setReportData({
      assessment: newAssessment,
      ...mentraReportResult
    });
    setIsTyping(false);
    
    await addBotMessage("You've done wonderfully. 🌸");
    await addBotMessage("I've prepared a personalized wellness report for you. Take your time reading through it.", 800);
    setShowReport(true);
  };

  const handleJoinGroup = () => {
    setShowReport(false);
    setShowCommunity(true);
  };

  if (showCommunity && assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-lavender-50/30 to-sage-50/30">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <GroupMembers 
            members={groupMembers} 
            focusGroup={assessment.final_focus_group}
            currentUserId={assessment.id}
          />
        </div>
      </div>
    );
  }

  if (showReport && assessment && reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-lavender-50/30 to-sage-50/30">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <MentraReport 
            reportData={reportData}
            onJoinGroup={handleJoinGroup}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-lavender-50/30 to-sage-50/30 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-100 to-sage-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-800">Mindful Match</h1>
                <p className="text-xs text-slate-500">Your path to support</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-50 border border-sage-100">
              <Sparkles className="w-3.5 h-3.5 text-sage-500" />
              <span className="text-xs font-medium text-sage-700">Confidential</span>
            </div>
          </div>
          <ProgressSteps currentStage={stage} />
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, index) => (
                msg.role === 'tat' ? (
                  <TATImage key={index} imageIndex={msg.imageIndex} />
                ) : (
                  <MessageBubble 
                    key={index} 
                    message={msg.content} 
                    isUser={msg.role === 'user'} 
                  />
                )
              ))}
            </AnimatePresence>
            
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <QuickOptions 
            options={quickOptions} 
            onSelect={handleUserMessage}
            disabled={isTyping}
          />
          <ChatInput 
            onSend={handleUserMessage}
            disabled={isTyping || stage === 'completed'}
            placeholder={stage === 'basic-info' ? "Type your age..." : showTATImage ? "Describe what you see and feel..." : "Share your thoughts..."}
          />
        </div>
      </footer>
    </div>
  );
}