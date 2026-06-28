import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'
import knowledgeBase from '../data/knowledge.json'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Faizan's AI assistant. How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBestAnswer = (query) => {
    const lowerQuery = query.toLowerCase().trim()
    
    // Quick greeting check
    const greetings = ['hi', 'hello', 'hey', 'sup', 'greetings']
    if (greetings.includes(lowerQuery) || (lowerQuery.length < 10 && greetings.some(g => lowerQuery.includes(g)))) {
      return "Hello! I'm Faizan's AI Assistant. You can ask me about his skills, projects, education, or contact details."
    }
    
    // Tokenize query into words, removing common stop words
    const stopWords = ['a', 'an', 'the', 'is', 'in', 'on', 'what', 'tell', 'me', 'about', 'do', 'you', 'know', 'can', 'how']
    const words = lowerQuery.split(/[\s,!?]+/).filter(w => w.length > 1 && !stopWords.includes(w))
    
    if (words.length === 0) return "I'm listening! What would you like to know about Faizan?"

    let bestMatch = null
    let maxScore = 0

    knowledgeBase.forEach(item => {
      let score = 0
      
      // Check each keyword against the user's words
      item.keywords.forEach(kw => {
        const kwLower = kw.toLowerCase()
        
        // Exact keyword match in the original query gets high score
        if (lowerQuery.includes(kwLower)) {
          score += 5
        } else {
          // Check if any word from the user matches part of the keyword
          words.forEach(word => {
            if (kwLower.includes(word) || word.includes(kwLower)) {
              score += 1
            }
          })
        }
      })
      
      if (score > maxScore) {
        maxScore = score
        bestMatch = item.answer
      }
    })

    // Require a minimum score threshold to avoid random matches
    if (maxScore >= 1) {
      return bestMatch
    }
    
    return "I'm not exactly sure about that. You can contact Faizan directly at umohdfaizan@gmail.com for more specific details!"
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userQuery = input.trim()
    setMessages(prev => [...prev, { text: userQuery, isBot: false }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const answer = findBestAnswer(userQuery)
      setMessages(prev => [...prev, { text: answer, isBot: true }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Simulated typing delay
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-brand-primary text-dark-bg shadow-[0_0_20px_rgba(0,245,255,0.4)] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] glass-card flex flex-col overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-white/10 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <FaRobot className="text-brand-primary" />
                <h3 className="font-bold text-white">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-white/10 text-white rounded-tl-none' 
                      : 'bg-brand-primary text-dark-bg font-medium rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-text-muted p-3 rounded-2xl rounded-tl-none text-sm flex gap-1 items-center">
                    <motion.div className="w-1.5 h-1.5 bg-brand-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                    <motion.div className="w-1.5 h-1.5 bg-brand-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-brand-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-dark-bg/80 backdrop-blur-md flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-full bg-brand-primary text-dark-bg disabled:opacity-50 transition-opacity"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
