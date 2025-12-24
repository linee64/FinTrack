import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Clock, Calendar, Video, BookOpen, Users } from 'lucide-react';
import { CreatePostModal } from './CreatePostModal';

export const Learning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'streams' | 'articles'>('courses');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Асем Нурланова',
      avatar: 'AH',
      avatarColor: 'bg-blue-100 text-blue-600',
      time: '2 часа назад',
      content: 'Поделюсь своим опытом: за 6 месяцев удалось погасить потребительский кредит на 2 года раньше! Главное - вносить даже небольшие дополнительные платежи ...',
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: 'Ерлан Сапаров',
      avatar: 'EC',
      avatarColor: 'bg-indigo-100 text-indigo-600',
      time: '5 часов назад',
      content: 'Вопрос: как лучше распределить дополнительные средства - закрыть мелкий кредит полностью или внести часть в ипотеку? У меня есть потребительский на 50...',
      likes: 15,
      comments: 12,
    },
    {
      id: 3,
      author: 'Динара Жумабаева',
      avatar: 'ДЖ',
      avatarColor: 'bg-emerald-100 text-emerald-600',
      time: '1 день назад',
      content: 'Начала отслеживать расходы через платформу - шок! Оказалось, на доставку еды трачу 60К в месяц. Сократила вдвое и теперь эти деньги идут на досрочное ...',
      likes: 31,
      comments: 6,
    },
  ]);

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: Date.now(),
      author: 'Айгуль К.',
      avatar: 'AK',
      avatarColor: 'bg-blue-100 text-blue-600',
      time: 'Только что',
      content,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const courses = [
    {
      id: 1,
      title: 'Стратегии досрочного погашения кредитов',
      description: 'Узнайте, как эффективно планировать дополнительные платежи и сократить срок кредита.',
      date: '15 ноября, 2025',
      duration: '90 минут',
      type: 'course',
    },
    {
      id: 2,
      title: 'Финансовая грамотность: основы управления долгами',
      description: 'Комплексный курс по управлению личными финансами и минимизации долговой нагрузки.',
      date: '20 ноября, 2025',
      duration: '120 минут',
      type: 'course',
    },
  ];

  const streams = [
    {
      id: 1,
      title: 'Q&A с финансовым консультантом',
      description: 'Прямой эфир: задайте свои вопросы о кредитах, инвестициях и финансовом планировании.',
      date: '10 ноября, 18:00',
      participants: 234,
      type: 'stream',
    },
    {
      id: 2,
      title: 'Разбор реальных кейсов: как выбраться из долгов',
      description: 'Анализ успешных историй погашения кредитов от участников сообщества.',
      date: '12 ноября, 19:00',
      participants: 189,
      type: 'stream',
    },
  ];

  const articles = [
    {
      id: 1,
      title: '10 способов сократить ежемесячные расходы',
      description: 'Практические советы по оптимизации бюджета без снижения качества жизни.',
      type: 'article',
    },
    {
      id: 2,
      title: 'Как работает рефинансирование кредитов в Казахстане',
      description: 'Подробное руководство по рефинансированию: когда это выгодно и на что обратить внимание.',
      type: 'article',
    },
    {
      id: 3,
      title: 'Психология денег: почему мы тратим больше, чем планируем',
      description: 'Разбираем психологические ловушки и учимся принимать осознанные финансовые решения.',
      type: 'article',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Обучение и сообщество</h1>
        <p className="text-gray-500 mt-1">Учитесь, делитесь опытом и развивайте финансовую грамотность</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Community Forum */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <MessageSquare className="w-5 h-5" />
                <h2 className="font-bold text-lg">Форум сообщества</h2>
              </div>
              <button 
                onClick={() => setIsCreatePostModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
              >
                Создать пост
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${post.avatarColor}`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{post.author}</span>
                        <span className="text-gray-400 text-xs">• {post.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                        {post.content}
                      </p>
                      <button className="text-blue-600 text-xs font-medium hover:underline mb-3">
                        Читать далее
                      </button>
                      <div className="flex items-center gap-4 text-gray-400 text-xs">
                        <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Education */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-gray-500 text-sm font-medium mb-4">Образование</h2>
            
            {/* Tabs */}
            <div className="relative grid grid-cols-3 bg-gray-50 p-1 rounded-lg mb-6 isolate">
              {/* Slider Animation */}
              <div 
                className="absolute top-1 bottom-1 left-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
                style={{
                  width: 'calc((100% - 0.5rem) / 3)',
                  transform: `translateX(${
                    activeTab === 'courses' ? '0%' : 
                    activeTab === 'streams' ? '100%' : 
                    '200%'
                  })`
                }}
              />
              
              <button 
                onClick={() => setActiveTab('courses')}
                className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-300 ${activeTab === 'courses' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Курсы
              </button>
              <button 
                onClick={() => setActiveTab('streams')}
                className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-300 ${activeTab === 'streams' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Эфиры
              </button>
              <button 
                onClick={() => setActiveTab('articles')}
                className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-300 ${activeTab === 'articles' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Статьи
              </button>
            </div>

            {/* Content List */}
            <div className="flex flex-col gap-4">
              {activeTab === 'courses' && courses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Video className="w-4 h-4" />
                    <span className="text-xs font-medium">{course.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {course.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 group-hover:shadow-md">
                    Записаться
                  </button>
                </div>
              ))}

              {activeTab === 'streams' && streams.map((stream) => (
                <div key={stream.id} className="border border-green-100 bg-green-50/30 rounded-xl p-4 hover:border-green-200 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-2 text-green-700">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium">{stream.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {stream.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {stream.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {stream.participants} участников
                    </div>
                  </div>
                  <button className="w-full py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm shadow-green-200 group-hover:shadow-md">
                    Присоединиться
                  </button>
                </div>
              ))}

              {activeTab === 'articles' && articles.map((article) => (
                <div key={article.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-300 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSave={handleCreatePost}
      />
    </div>
  );
};
