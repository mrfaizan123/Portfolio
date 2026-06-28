import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const ContactInfo = ({ icon, title, content, link }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
    <div className="p-3 rounded-full bg-brand-primary/20 text-brand-primary">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      {link ? (
        <a href={link} className="text-text-muted hover:text-brand-primary transition-colors">{content}</a>
      ) : (
        <p className="text-text-muted">{content}</p>
      )}
    </div>
  </div>
)

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      // Using Web3Forms for easy frontend email sending without a backend
      // Get your free access key from https://web3forms.com
      const accessKey = "50f78870-cfd6-4fba-93a1-280d79961f63" // <--- USER NEEDS TO UPDATE THIS

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: "Faizan Portfolio"
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
        console.error('Error sending email:', result)
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl">
      <Helmet>
        <title>Contact | Mohd Faizan</title>
        <meta name="description" content="Get in touch with Mohd Faizan for freelance projects, AI consulting, or full-time opportunities." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
          Get In <span className="text-brand-accent">Touch</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Have an idea or a project in mind? Let's build something amazing together.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          <ContactInfo
            icon={<FaEnvelope size={20} />}
            title="Email"
            content="umohdfaizan@gmail.com"
            link="mailto:umohdfaizan@gmail.com"
          />
          <ContactInfo
            icon={<FaPhoneAlt size={20} />}
            title="Phone"
            content="+91 8810743304"
            link="tel:+918810743304"
          />
          <ContactInfo
            icon={<FaMapMarkerAlt size={20} />}
            title="Location"
            content="Lucknow, India"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 glass-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Your Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Your Email</label>
                <input
                  type="email"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">Valid email is required</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Subject</label>
              <input
                type="text"
                {...register("subject", { required: true })}
                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
              <textarea
                {...register("message", { required: true })}
                rows="5"
                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                placeholder="Hello, I'd like to talk about..."
              ></textarea>
              {errors.message && <span className="text-red-500 text-xs mt-1">Message is required</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary text-dark-bg font-bold rounded-lg px-6 py-4 flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : (
                <>Send Message <FaPaperPlane /></>
              )}
            </button>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-brand-accent/20 border border-brand-accent text-brand-accent rounded-lg text-center font-medium mt-4"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-center font-medium mt-4"
              >
                Failed to send message. Please ensure the Web3Forms Access Key is set!
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
