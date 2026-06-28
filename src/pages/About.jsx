import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const TimelineItem = ({ year, title, subtitle, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="relative pl-8 pb-8 border-l border-white/10 last:border-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
    <span className="text-brand-secondary font-bold text-sm tracking-widest uppercase">{year}</span>
    <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
    <h4 className="text-brand-accent font-medium">{subtitle}</h4>
    <p className="mt-2 text-text-muted text-sm leading-relaxed">{desc}</p>
  </motion.div>
)

const About = () => {
  return (
    <div className="container mx-auto px-6 py-24 max-w-5xl">
      <Helmet>
        <title>About | Mohd Faizan</title>
        <meta name="description" content="Learn more about Mohd Faizan, a software engineer and BCA student at Integral University." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 grid lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-5 relative group flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 rounded-full scale-90" />
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl z-10">
            <img 
              src="/profile.jpg" 
              alt="Mohd Faizan" 
              className=""
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md hidden flex-col items-center justify-center text-center p-6 border border-dashed border-white/20 rounded-3xl">
              <span className="text-4xl mb-4">📸</span>
              <p className="text-text-muted text-sm">Place <code className="text-brand-primary font-bold">profile.jpg</code><br/>in your public folder</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            About <span className="text-brand-primary">Me</span>
          </h1>
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
          <p className="text-lg text-text-muted leading-relaxed mb-4">
            Hi, I'm <strong className="text-white">Mohd Faizan</strong> — a Full Stack Developer and Machine Learning enthusiast currently pursuing my Master of Computer Applications (MCA) at Integral University.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            I transform raw data into actionable insights and build responsive, intelligent web applications. My goal is to create scalable software solutions that merge modern web technologies with artificial intelligence, empowering businesses and users alike.
          </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-8 font-heading text-white">Education</h2>
          <div className="ml-2">
            <TimelineItem 
              year="2023-2026" 
                   
              title="Bachelor of Computer Applications" 
              subtitle="Integral University, Lucknow" 
              desc="Achieved an outstanding CGPA of 9.5, focusing on data structures, algorithms, and software engineering."
              delay={0.1}
            />
            <TimelineItem 
              year="Present" 
                   
              title="Master of Computer Application" 
              subtitle="Integral University, Lucknow" 
              desc="Focusing on Advanced Data Structures, Algorithms,AI and Software Engineering."
              delay={0.1}
            />  
            <TimelineItem 
              year="2025" 
              title="Data Science Training" 
              subtitle="Oracle & Internshala" 
              desc="Completed comprehensive data science training covering Python, SQL, data analysis, and machine learning."
              delay={0.2}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-8 font-heading text-white">Experience</h2>
          <div className="ml-2">
            <TimelineItem 
              year="2025" 
              title="Python for Data Science" 
              subtitle="IBM" 
              desc="Specialized training in Python programming for data science applications and analysis."
              delay={0.1}
            />
            <TimelineItem 
              year="2026" 
              title="Frontend Developer" 
              subtitle="Weproztech" 
              desc="Completed virtual internship focusing on  modern web technologies, UI/UX design, and responsive web development."
              delay={0.2}
            />
           <TimelineItem 
  year="2026-Ongoing" 
  title="Software Developer" 
  subtitle="Integral University, Lucknow" 
  desc="Developing Full Stack Projects, with maintaining the large dataset and improving my AI and web development skills."
  delay={0.2}
/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
