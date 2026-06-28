import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import skillsData from '../data/skills.json'
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import * as TbIcons from 'react-icons/tb'
import * as GiIcons from 'react-icons/gi'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io5'
import * as DiIcons from 'react-icons/di'

const IconLoader = ({ iconName }) => {
  let IconComponent = FaIcons[iconName] || SiIcons[iconName] || TbIcons[iconName] || GiIcons[iconName] || BsIcons[iconName] || IoIcons[iconName] || DiIcons[iconName] || FaIcons.FaCode
  return <IconComponent size={24} className="text-brand-primary" />
}

const SkillBar = ({ name, level, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-4 hover:border-brand-primary/50 transition-colors group"
  >
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <IconLoader iconName={icon} />
        <span className="font-semibold text-white group-hover:text-brand-primary transition-colors">{name}</span>
      </div>
      <span className="text-sm font-bold text-brand-secondary">{level}%</span>
    </div>
    <div className="h-2 w-full bg-dark-bg rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
      />
    </div>
  </motion.div>
)

const Skills = () => {
  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl">
      <Helmet>
        <title>Skills | Mohd Faizan</title>
        <meta name="description" content="Technical skills and proficiencies of Mohd Faizan in AI, Machine Learning, and Web Development." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
          My <span className="text-brand-secondary">Skills</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise, ranging from modern web development to advanced machine learning concepts.
        </p>
      </div>

      <div className="space-y-16">
        {skillsData.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-2xl font-bold text-white mb-6 pl-4 border-l-4 border-brand-accent">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <SkillBar 
                  key={skillIndex} 
                  name={skill.name} 
                  level={skill.level} 
                  icon={skill.icon} 
                  delay={skillIndex * 0.1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
