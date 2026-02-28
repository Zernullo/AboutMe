import { Github } from 'lucide-react'

type Experience = {
	company: string
	role: string
	period: string
	description: string
	skills: string[]
	github?: { label: string; url: string }
}

const experiences: Experience[] = [
    {
		company: 'University IT',
		role: 'IT Support Specialist',
		period: '2026 - Present (Part-Time)',
		description: `LSU's University IT department provides comprehensive technical support to the campus community, including students, faculty, and staff.
		As an IT Support Specialist, I am responsible for diagnosing and resolving a wide range of hardware and software issues, managing user accounts, and maintaining network infrastructure.
		This role has allowed me to develop strong problem-solving skills and a deep understanding of various operating systems and software applications.
		I work closely with users to ensure their technology needs are met efficiently, contributing to the overall smooth operation of the university's IT services.`,
		skills: ['Technical Support', 'Networking', 'Active Directory', 'Customer Service']
	},
	{
		company: 'Rise Studio',
		role: 'Research Assistant',
		period: '2025 - Present (Part-Time)',
		description: `LSU Rise Studio is an interdisciplinary research lab focused on Software Engineering and Robotics
		I work closely under PHD candidate Elijah Phifer on a project called pAIrStudio, which is a research platform designed to study the effectiveness of AI-assisted programming in educational contexts.
		The participant will complete a visual programming challenges to control a warehouse robot in an isometric environment while receiving levels of AI assistance based on experimental group assignment.
		My role involves developing the platform using Phaser.js for the game environment, implementing features and completing tasks assigned by the lead developer, Elijah.
		This experience has allowed me to gain hands-on experience in software development, research methodologies, and the application of AI in educational settings.`,
		skills: ['JavaScript', 'Phaser.js', 'AI Chatbox Integration', 'Educational Technology'],
		github: { label: 'View on GitHub', url: 'https://github.com/riseatlsu/pAIrStudio' }
	},
]

function ExperienceSection() {
	return (
		<section id="experience" className="py-10">
			<div className="flex items-center gap-6 mb-12">
				<div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
				<div className="text-center">
					<h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
						Experience
					</h2>
					<p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">
						Professional & Academic Roles
					</p>
				</div>
				<div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{experiences.map(exp => (
					<div key={exp.company + exp.role} className="flex flex-col rounded border border-[#00ff41]/20 bg-[#1a1a1a] p-6 shadow-md hover:border-[#00ff41]/60 transition-all">
						<div className="flex items-center gap-2 mb-2">
							<span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
							<span className="text-xs font-mono uppercase tracking-widest text-[#00ff41]">{exp.company}</span>
							<span className="ml-auto text-xs font-mono text-[#888888]">{exp.period}</span>
						</div>
						<h3 className="text-lg font-semibold text-[#e0e0e0] mb-1">{exp.role}</h3>
						<p className="text-sm text-[#888888] mb-3 whitespace-pre-line flex-1">{exp.description}</p>
						<div className="flex flex-wrap gap-2 mt-2">
							{exp.skills.map(skill => (
								<span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30">
									{skill}
								</span>
							))}
						</div>
						{exp.github && (
							<div className="mt-4 pt-3 border-t border-[#2a2a2a]">
								<a
									href={exp.github.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-xs font-mono text-[#00ff41]/60 hover:text-[#00ff41] transition-colors"
								>
									<Github className="h-3.5 w-3.5" />
									{exp.github.label}
								</a>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	)
}

export default ExperienceSection