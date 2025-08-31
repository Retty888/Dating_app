import ChatSection from '@/components/ChatSection';
import searchAgent from '@/lib/searchAgent';

export default function SearchChat() {
  return <ChatSection section="search" agent={searchAgent} />;
}

