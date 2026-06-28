import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import projectsData from '../data/projects.json'

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Full Stack', 'AI & ML']

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => {
        const cat = Array.isArray(p.category) ? p.category : [p.category]
        if (filter === 'AI & ML') {
          return cat.includes('AI') || cat.includes('ML')
        }
        return cat.includes(filter)
      })

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <Helmet>
        <title>Projects | Mohd Faizan</title>
        <meta name="description" content="Explore the portfolio projects of Mohd Faizan including Full Stack Apps, Machine Learning models, and AI systems." />
      </Helmet>

      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white"
        >
          Featured <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Projects</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted max-w-2xl mx-auto mb-10 text-lg"
        >
          A showcase of my recent work, blending design, robust engineering, and artificial intelligence to solve complex problems.
        </motion.p>

        {/* Premium Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg shadow-lg scale-105' 
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            // Unify AI/ML display tag
            const isAIML = Array.isArray(project.category) 
              ? (project.category.includes('AI') || project.category.includes('ML'))
              : (project.category === 'AI' || project.category === 'ML');
            const displayCat = isAIML ? 'AI & ML' : (Array.isArray(project.category) ? project.category.join(', ') : project.category);

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-brand-primary/40 transition-all duration-500 bg-dark-bg flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 hidden items-center justify-center text-5xl">
                    🖼️
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-5 right-5">
                    <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-brand-primary/90 text-dark-bg backdrop-blur-md shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                      {displayCat}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10 bg-gradient-to-t from-dark-bg via-dark-bg to-transparent">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors duration-300 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium text-brand-accent bg-brand-accent/10 border border-brand-accent/20 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                        <FaGithub size={18} /> Source Code
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-dark-bg bg-brand-primary hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all">
                        <FaExternalLinkAlt size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Projects
