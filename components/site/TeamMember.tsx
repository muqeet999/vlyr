import type { TeamMember as TeamMemberType } from "@/data/team";

export function TeamMember({ member, index }: { member: TeamMemberType; index: number }) {
  return (
    <li className="team-member">
      <span>0{index + 1}</span>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </li>
  );
}
