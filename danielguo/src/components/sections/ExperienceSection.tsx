
type Experience = {
	company: string
	role: string
	period: string
	description: string
	skills: string[]
}

const experiences: Experience[] = [
	{
		company: 'CyberTech Solutions',
		role: 'Security Analyst',
		period: '2024 - Present',
		description: 'Analyzed threat intelligence, performed vulnerability assessments, and contributed to incident response for enterprise clients.',
		skills: ['Threat Analysis', 'SIEM', 'Incident Response', 'Python']
	},
	{
		company: 'DataGuard Inc.',
		role: 'Penetration Tester',
		period: '2022 - 2024',
		description: 'Conducted penetration tests, wrote detailed reports, and helped clients improve their security posture.',
		skills: ['PenTesting', 'Reporting', 'Linux', 'Burp Suite']
	},
	{
		company: 'University IT',
		role: 'IT Support Specialist',
		period: '2020 - 2022',
		description: 'Provided technical support, managed user accounts, and maintained network infrastructure.',
		skills: ['Technical Support', 'Networking', 'Active Directory']
	}
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
					<div key={exp.company + exp.role} className="relative rounded border border-[#00ff41]/20 bg-[#1a1a1a] p-6 shadow-md hover:border-[#00ff41]/60 transition-all">
						<div className="flex items-center gap-2 mb-2">
							<span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
							<span className="text-xs font-mono uppercase tracking-widest text-[#00ff41]">{exp.company}</span>
							<span className="ml-auto text-xs font-mono text-[#888888]">{exp.period}</span>
						</div>
						<h3 className="text-lg font-semibold text-[#e0e0e0] mb-1">{exp.role}</h3>
						<p className="text-sm text-[#888888] mb-3">{exp.description}</p>
						<div className="flex flex-wrap gap-2 mt-2">
							{exp.skills.map(skill => (
								<span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30">
									{skill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default ExperienceSection
