import ChatSection from '@/components/ChatSection';
import profileAgent from '@/lib/profileAgent';

export default function ProfileChat() {
  return <ChatSection section="profile" agent={profileAgent} />;
}

