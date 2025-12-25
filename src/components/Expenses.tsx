import React, { useState } from 'react';
import { Plus, ShoppingBag, Car, GraduationCap, Coffee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const Expenses: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<'day' | 'week' | 'month'>('day');

  // Donut chart data is now calculated dynamically
  // const donutData = [ ... ];

  // Mock data for bar chart
  const barData = [
    { name: 'Пн', value: 8000 },
    { name: 'Вт', value: 12000 },
    { name: 'Ср', value: 5000 },
    { name: 'Чт', value: 15000 },
    { name: 'Пт', value: 9500 },
    { name: 'Сб', value: 18000 },
    { name: 'Вс', value: 6000 },
  ];

  // Mock history data
  const historyData = [
    {
      id: 1,
      title: 'Продукты в магазине',
      category: 'Еда',
      date: '2025-11-07',
      amount: 15000,
      icon: ShoppingBag,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Бензин',
      category: 'Транспорт',
      date: '2025-11-06',
      amount: 8000,
      icon: Car,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 3,
      title: 'Онлайн курс',
      category: 'Образование',
      date: '2025-11-05',
      amount: 25000,
      icon: GraduationCap,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 4,
      title: 'Ресторан',
      category: 'Еда',
      date: '2025-11-04',
      amount: 12000,
      icon: ShoppingBag,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 5,
      title: 'Кофе',
      category: 'Развлечения',
      date: '2025-11-03',
      amount: 5000,
      icon: Coffee,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
  ];

  const [history, setHistory] = useState(historyData);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'Выберите',
    description: ''
  });

  // Calculate chart data from history
  const calculateDonutData = () => {
    const categoryTotals: Record<string, number> = {};
    history.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

    const colors: Record<string, string> = {
      'Еда': '#3b82f6',
      'Транспорт': '#a855f7',
      'Образование': '#10b981',
      'Развлечения': '#f43f5e',
    };

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || '#9ca3af',
    }));
  };

  const donutData = calculateDonutData();
  const totalExpenses = donutData.reduce((acc, curr) => acc + curr.value, 0);

  const handleAddExpense = () => {
    if (!newExpense.amount || newExpense.category === 'Выберите') return;

    let icon = ShoppingBag;
    let iconColor = 'text-gray-500';
    let bgColor = 'bg-gray-50';

    switch (newExpense.category) {
      case 'Еда':
        icon = ShoppingBag;
        iconColor = 'text-blue-500';
        bgColor = 'bg-blue-50';
        break;
      case 'Транспорт':
        icon = Car;
        iconColor = 'text-purple-500';
        bgColor = 'bg-purple-50';
        break;
      case 'Образование':
        icon = GraduationCap;
        iconColor = 'text-emerald-500';
        bgColor = 'bg-emerald-50';
        break;
      case 'Развлечения':
        icon = Coffee;
        iconColor = 'text-rose-500';
        bgColor = 'bg-rose-50';
        break;
    }

    const newItem = {
      id: Date.now(),
      title: newExpense.description || newExpense.category,
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
      amount: Number(newExpense.amount),
      icon,
      iconColor,
      bgColor,
    };

    setHistory([newItem, ...history]);
    setNewExpense({ amount: '', category: 'Выберите', description: '' });
  };

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Расходы</h1>
        <p className="text-gray-500 mt-1">Отслеживайте свои траты и анализируйте привычки</p>
      </div>

      {/* Add Expense Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-gray-500 text-sm font-medium mb-4">Добавить расход</h2>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs text-gray-500 mb-1">Сумма (₸)</label>
            <input 
              type="number" 
              placeholder="0"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs text-gray-500 mb-1">Категория</label>
            <select 
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
            >
              <option>Выберите</option>
              <option>Еда</option>
              <option>Транспорт</option>
              <option>Образование</option>
              <option>Развлечения</option>
            </select>
          </div>
          <div className="flex-[2] w-full">
            <label className="block text-xs text-gray-500 mb-1">Описание (опционально)</label>
            <input 
              type="text" 
              placeholder="Например: Покупка продуктов"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={handleAddExpense}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 h-[42px]"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-gray-500 text-sm font-medium mb-6">Расходы по категориям</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
            <div className="relative w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400 mb-1">Общие расходы</span>
                <span className="text-lg font-bold text-gray-900">{formatMoney(totalExpenses)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              {donutData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">{formatMoney(item.value)}</span>
                    <span className="text-gray-400 w-8 text-right">
                      {Math.round((item.value / totalExpenses) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-500 text-sm font-medium">Динамика расходов</h2>
            <div className="flex bg-gray-50 rounded-lg p-1">
              <button 
                onClick={() => setActivePeriod('day')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activePeriod === 'day' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                День
              </button>
              <button 
                onClick={() => setActivePeriod('week')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activePeriod === 'week' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Неделя
              </button>
              <button 
                onClick={() => setActivePeriod('month')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activePeriod === 'month' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Месяц
              </button>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-gray-500 text-sm font-medium mb-4">История расходов</h2>
        <div className="flex flex-col gap-2">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor} ${item.iconColor}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category} • {item.date}</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">{formatMoney(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
