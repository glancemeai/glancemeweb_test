import Header from '../home/header/header';

import Hero from '../components/meetingBotHero/meetingBot';
import Features from '../components/meetinBotFeatures.tsx/features';

export default function Home() {
  return (
    <main>
      <Header/>
      <Hero />
      <Features/>
      {/* <ChatTabs/> */}
    </main>
  )
}

