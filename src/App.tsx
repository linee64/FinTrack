import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Expenses } from './components/Expenses';
import { Learning } from './components/Learning';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'learning'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-8">
        <div className="animate-in fade-in zoom-in-95 duration-300">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'expenses' && <Expenses />}
          {activeTab === 'learning' && <Learning />}
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}

export default App;
