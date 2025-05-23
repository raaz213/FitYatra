import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "10+ years in fitness tech, former Olympic trainer",
  },
  {
    name: "Mike Chen",
    role: "CTO",
    bio: "Tech innovator with passion for health analytics",
  },
  {
    name: "Emma Davis",
    role: "Head of Design",
    bio: "UX expert focused on intuitive wellness experiences",
  },
];

const Team = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Meet Our Team</Text>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.teamMember}>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberBio}>{member.bio}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
  },
  teamMember: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#c7c7c7",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  memberInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: "#667eea",
    marginBottom: 6,
  },
  memberBio: {
    fontSize: 14,
    color: "#64748b",
  },
});
