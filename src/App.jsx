// ... 您的所有 import 语句 ...

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // <-- 只保留这一行

// --- 1. 角色数据与人格设定 (Persona Data) ---
const TEACHERS = [
// ...

// --- 2. API Setup ---
const generateAIResponse = async (contact, history, userMessage) => {
    // ... 函数逻辑
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, User, Compass, Menu, ChevronLeft, Plus, Smile, Mic, MoreHorizontal, Search, Camera, Heart, MessageCircle, X } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- 1. 角色数据与人格设定 (Persona Data) ---
// 为了方便管理，我们将角色分类，实际渲染时合并
const TEACHERS = [
  { id: 't_chinese', name: '王老师 (语文)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinese&clothingType=BlazerShirt&glassesType=Round', 
    lastMessage: '这次作文跑题的同学，放学来我办公室。', time: '11:20',
    systemPrompt: '你是严厉的语文老师。喜欢引用古诗词，对错别字零容忍。说话文绉绉的，喜欢强调“语文素养”。' },
  { id: 't_math', name: '李老师 (数学)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Math&clothingType=ShirtCrewNeck&topType=ShortHairTheCaesar', 
    lastMessage: '最后一道大题，全班只有三个人做对！', time: '10:05',
    systemPrompt: '你是高三数学老师。口头禅：“看黑板，这道题是送分题”，“你们是我带过最差的一届”。逻辑严密，只聊数学。' },
  { id: 't_english', name: 'Miss Zhang (英语)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=English&topType=LongHairStraight&hairColor=Blonde', 
    lastMessage: 'Don\'t forget to recite the vocabulary!', time: '09:00',
    systemPrompt: '你是洋气的英语老师。说话喜欢中英夹杂（“这个Grammar点很重要”）。鼓励式教育，叫学生Honey或Class。' },
  { id: 't_physics', name: '陈老师 (物理)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Physics&facialHairType=MoustacheMagnum', 
    lastMessage: '受力分析图画了吗？', time: '昨天',
    systemPrompt: '你是物理老师。喜欢用生活中的例子解释力学。理科直男思维，说话简练。' },
  { id: 't_chem', name: '刘老师 (化学)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chem&accessoriesType=Prescription02', 
    lastMessage: '实验室禁止饮食！谁把奶茶带进去了？', time: '昨天',
    systemPrompt: '你是化学老师。非常注重安全。喜欢用化学方程式比喻人生。' },
  { id: 't_bio', name: '赵老师 (生物)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bio&topType=LongHairBun', 
    lastMessage: '显微镜下的切片观察完了吗？', time: '周一',
    systemPrompt: '你是生物老师。热爱大自然，喜欢讲动植物的趣闻。' },
  { id: 't_history', name: '孙老师 (历史)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=History&topType=WinterHat1', 
    lastMessage: '以史为鉴，可知兴替啊同学们。', time: '周一',
    systemPrompt: '你是年长的历史老师。讲课像讲故事，喜欢讲野史，语气沧桑感叹。' },
  { id: 't_geo', name: '吴老师 (地理)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Geo&accessoriesType=Sunglasses', 
    lastMessage: '洋流图要背熟，必考。', time: '周日',
    systemPrompt: '你是地理老师。喜欢旅游，讲课喜欢结合各地风土人情。' },
  { id: 't_pe', name: '雷老师 (体育)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PE&clothingType=Hoodie', 
    lastMessage: '今天数学老师有事，这节课上数学。', time: '周日',
    systemPrompt: '你是经常“生病”被占课的体育老师。性格豪爽，但是在学校地位不高，总被其他主科老师抢课。' },
  { id: 't_politics', name: '郑老师 (政治)', role: '老师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Politics&facialHairType=BeardLight', 
    lastMessage: '背诵核心价值观，明天抽查。', time: '周六',
    systemPrompt: '你是政治老师。说话很官方，喜欢升华主题，关注时事新闻。' },
];

const RELATIVES = [
  { id: 'r_mom', name: '皇太后 (老妈)', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mom&topType=LongHairCurvy', 
    lastMessage: '【链接】震惊！年轻人熬夜竟然会...', time: '12:30',
    systemPrompt: '你是用户的妈妈。极度唠叨，关心有没有吃饭、穿秋裤、找对象。喜欢转发养生谣言。' },
  { id: 'r_dad', name: '老爸', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dad&facialHairType=MoustacheFancy', 
    lastMessage: '没钱了说话。', time: '昨天',
    systemPrompt: '你是用户的爸爸。话少，威严但内心柔软。通常只在转账或者大事时说话。' },
  { id: 'r_grandma', name: '奶奶', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grandma&hairColor=SilverGray&topType=LongHairBun', 
    lastMessage: '乖孙，什么时候回来吃红烧肉？', time: '08:00',
    systemPrompt: '你是奶奶。极其宠溺孙子/孙女，觉得你永远吃不饱，说话很慢很慈祥。' },
  { id: 'r_aunt1', name: '二姑', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aunt1&accessoriesType=Prescription01', 
    lastMessage: '你表哥考上公务员了，你呢？', time: '昨天',
    systemPrompt: '你是喜欢攀比的二姑。三句话不离你家孩子多优秀，喜欢打听用户的工资和对象。' },
  { id: 'r_uncle2', name: '三舅', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Uncle2&facialHairType=BeardMagnum', 
    lastMessage: '今晚来家里喝酒！有好酒！', time: '周五',
    systemPrompt: '你是豪爽的三舅。喜欢喝酒吹牛，说话大嗓门，但也很大方。' },
  { id: 'r_cousin_bro', name: '表弟', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CousinBro&topType=ShortHairFrizzle', 
    lastMessage: '哥，借我50块充游戏，别告诉舅妈。', time: '周四',
    systemPrompt: '你是调皮的表弟。经常闯祸，不仅怕家长，还老找表哥/表姐借钱买皮肤。' },
  { id: 'r_cousin_sis', name: '堂姐', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CousinSis&topType=LongHairBob', 
    lastMessage: '最近那个护肤品打折，拼单吗？', time: '周三',
    systemPrompt: '你是时尚的堂姐。工作狂，但也爱买买买，经常给用户种草。' },
  { id: 'r_grandpa', name: '爷爷', role: '亲戚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grandpa&hairColor=SilverGray&facialHairType=BeardMedium', 
    lastMessage: '新闻联播开始了。', time: '周二',
    systemPrompt: '你是爷爷。关心国家大事，喜欢下棋、喝茶，说话像老干部。' },
];

const DAZI = [
  { id: 'd_food', name: '饭搭子-小美', role: '搭子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie', 
    lastMessage: '海底捞出了新品，冲不冲？', time: '11:00',
    systemPrompt: '你是吃货搭子。脑子里只有吃，知道全城所有的美食优惠。' },
  { id: 'd_gym', name: '举铁搭子-阿强', role: '搭子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GymBro&clothingType=TankTop', 
    lastMessage: '今晚练腿，别鸽！', time: '10:00',
    systemPrompt: '你是健身搭子。互相监督，如果用户偷懒会疯狂轰炸。' },
  { id: 'd_game', name: '上分搭子-野王', role: '搭子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer&accessoriesType=Sunglasses', 
    lastMessage: '来一把？我带飞。', time: '凌晨',
    systemPrompt: '你是游戏大神。说话简短装酷，只在乎输赢和排位。' },
  { id: 'd_fish', name: '摸鱼搭子-老王', role: '搭子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Worker', 
    lastMessage: '老板去开会了，速来茶水间。', time: '15:00',
    systemPrompt: '你是职场摸鱼搭子。消息灵通，专门交流公司八卦和偷懒技巧。' },
  { id: 'd_travel', name: '旅游搭子-驴友', role: '搭子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Traveler&accessoriesType=Round', 
    lastMessage: '特价机票！去不去泰国？', time: '周一',
    systemPrompt: '你是热爱穷游的搭子。总是能发现便宜机票和攻略，说走就走。' },
];

const OTHERS = [
  { id: 'celebrity', name: '王嘉尔 (Jackson)', role: '明星', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson&style=circle&topType=ShortHairDreads01&accessoriesType=Sunglasses', 
    lastMessage: 'Hey bro! 演唱会来吗？', time: '刚刚',
    systemPrompt: '你现在是王嘉尔。性格热情、绅士、酷，喜欢用Emoji，说话夹杂Bro, Cool。' },
  { id: 'crush', name: '林校花', role: '暗恋', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Crush&topType=LongHairStraight', 
    lastMessage: '你的笔记字真好看~', time: '周二',
    systemPrompt: '你是温柔可爱的校花。语气暧昧，喜欢用颜文字，让用户心跳加速。' },
  { id: 'coach', name: '驾校王教练', role: '教练', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Driver&facialHairType=MoustacheFancy', 
    lastMessage: '把刹车当油门踩？想上天？', time: '昨天',
    systemPrompt: '你是暴躁驾校教练。阴阳怪气，恨铁不成钢。' },
];

// 合并所有联系人
const ALL_CONTACTS = [...TEACHERS, ...RELATIVES, ...DAZI, ...OTHERS];

// 初始化朋友圈数据
const INITIAL_MOMENTS = [
  { id: 1, userId: 'r_mom', content: '转发：多吃这种菜，癌症远离你！家里有老人的必看！', image: null, time: '1小时前', likes: ['r_aunt1', 'r_uncle2'], comments: [{user: 'r_aunt1', text: '已转发，为了家人健康'}] },
  { id: 2, userId: 'd_gym', content: '今日份打卡！No Pain No Gain! 💪💪💪', image: 'gym', time: '2小时前', likes: ['d_food', 'coach'], comments: [] },
  { id: 3, userId: 't_pe', content: '通知：下周一开始体测，都把跑鞋准备好，谁也别想请假。', image: null, time: '3小时前', likes: ['t_math', 't_chinese'], comments: [{user: 't_math', text: '雷老师，下周一第三节课能不能借我讲卷子？'}] },
  { id: 4, userId: 'celebrity', content: 'Shanghai 🇨🇳! Thank you for the energy tonight! 🔥🔥🔥 #MAGICMAN', image: 'concert', time: '5小时前', likes: ['crush', 'd_game'], comments: [] },
  { id: 5, userId: 'r_cousin_bro', content: '这就很尴尬了...', image: null, time: '6小时前', likes: [], comments: [{user: 'r_mom', text: '又在那玩手机！作业写完了吗？'}] },
  { id: 6, userId: 'crush', content: '图书馆的阳光真好 ☀️', image: 'library', time: '昨天', likes: ['t_chinese'], comments: [] },
];

// --- 2. API Setup ---
const apiKey = ""; // API Key injected by environment

const generateAIResponse = async (contact, history, userMessage) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

    const chatHistoryForModel = history.map(msg => ({
        role: msg.sender === 'me' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const chatSession = model.startChat({
      history: chatHistoryForModel,
      systemInstruction: contact.systemPrompt,
    });

    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "（对方正在忙，稍后回复...）";
  }
};

// --- 3. Components ---

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: '微信', count: 99 },
    { id: 'contacts', icon: User, label: '通讯录' },
    { id: 'discover', icon: Compass, label: '发现', dot: true },
    { id: 'me', icon: Menu, label: '我' }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-[#F7F7F7] border-t border-gray-300 flex justify-around items-center py-1 pb-2 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center relative p-1 ${activeTab === item.id ? 'text-[#07C160]' : 'text-gray-500'}`}
        >
          <div className="relative">
            <item.icon size={26} strokeWidth={1.5} fill={activeTab === item.id ? "currentColor" : "none"} />
            {item.count && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">{item.count > 99 ? '99+' : item.count}</span>}
            {item.dot && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          </div>
          <span className="text-[10px] mt-0.5">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const ChatListItem = ({ contact, onClick }) => (
  <div onClick={onClick} className="flex items-center p-3 bg-white hover:bg-gray-50 active:bg-gray-100 border-b border-gray-100 cursor-pointer transition-colors">
    <div className="relative">
      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-lg bg-gray-200 object-cover" />
    </div>
    <div className="ml-3 flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium text-gray-900 truncate text-base">{contact.name}</h3>
        <span className="text-xs text-gray-400">{contact.time}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
    </div>
  </div>
);

const MessageBubble = ({ message, sender, avatar }) => {
  const isMe = sender === 'me';
  return (
    <div className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-md bg-gray-200 mr-2 self-start" />
      )}
      <div className={`relative max-w-[70%] px-3 py-2 rounded-md text-[15px] leading-relaxed break-words shadow-sm
        ${isMe ? 'bg-[#95EC69] text-black' : 'bg-white text-black border border-gray-200'}`}>
        <div className={`absolute top-3 w-0 h-0 border-[6px] border-transparent 
          ${isMe ? 'right-[-12px] border-l-[#95EC69]' : 'left-[-12px] border-r-white'}`} />
        {message.text}
      </div>
      {isMe && (
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="my avatar" className="w-10 h-10 rounded-md bg-gray-200 ml-2 self-start" />
      )}
    </div>
  );
};

const ChatInterface = ({ contact, onBack, history, onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-[#F5F5F5] z-50 flex flex-col h-full">
      <div className="bg-[#F5F5F5] px-4 py-3 flex items-center justify-between border-b border-gray-300 shadow-sm sticky top-0">
        <button onClick={onBack} className="flex items-center text-black -ml-2">
          <ChevronLeft size={24} />
          <span className="text-[15px]">微信</span>
        </button>
        <h2 className="font-medium text-[17px] text-black">{contact.name}</h2>
        <MoreHorizontal size={24} className="text-black" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-20 scroll-smooth" ref={scrollRef}>
        <div className="text-center text-xs text-gray-400 my-4 bg-gray-200/50 inline-block px-2 py-1 rounded mx-auto w-fit block">{contact.time}</div>
        {history.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} sender={msg.sender} avatar={contact.avatar} />
        ))}
        {isTyping && (
           <div className="flex w-full mb-4 justify-start">
              <img src={contact.avatar} alt="avatar" className="w-10 h-10 rounded-md bg-gray-200 mr-2 self-start" />
              <div className="bg-white text-gray-500 px-3 py-2 rounded-md border border-gray-200 text-sm flex items-center">对方正在输入...</div>
           </div>
        )}
      </div>
      <div className="bg-[#F7F7F7] p-2 border-t border-gray-300 flex items-end gap-2 pb-4 sm:pb-2">
        <Mic size={26} className="p-1" />
        <div className="flex-1 bg-white rounded px-2 py-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="w-full bg-transparent outline-none text-base" />
        </div>
        <Smile size={26} className="p-1" />
        {input.length > 0 ? 
            <button onClick={handleSend} className="bg-[#07C160] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium">发送</button> : 
            <Plus size={26} className="p-1" />
        }
      </div>
    </div>
  );
};

// 朋友圈组件
const Moments = ({ contacts, moments, onLike }) => {
  return (
    <div className="pb-20 bg-white min-h-screen">
        {/* Header with Cover */}
        <div className="relative h-64 mb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" className="w-full h-full object-cover opacity-80" alt="cover" />
            </div>
            <div className="absolute bottom-[-20px] right-4 flex items-end gap-3">
                <span className="text-white font-bold text-lg mb-6 drop-shadow-md">我自己</span>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" className="w-20 h-20 rounded-lg border-2 border-white bg-gray-200" alt="me" />
            </div>
        </div>

        {/* Moments List */}
        <div className="px-3">
            {moments.map(moment => {
                const author = contacts.find(c => c.id === moment.userId) || { name: '未知用户', avatar: '' };
                return (
                    <div key={moment.id} className="flex gap-3 mb-8 border-b border-gray-100 pb-4">
                        <img src={author.avatar} className="w-10 h-10 rounded-md bg-gray-200 shrink-0" alt={author.name} />
                        <div className="flex-1">
                            <h4 className="text-[#576b95] font-semibold text-[15px] mb-1">{author.name}</h4>
                            <p className="text-[15px] text-gray-900 mb-2 leading-normal">{moment.content}</p>
                            {/* Image Placeholder */}
                            {moment.image && (
                                <div className="bg-gray-200 w-40 h-40 mb-2 flex items-center justify-center text-gray-400 rounded-sm">
                                    {moment.image === 'gym' && '🏋️'}
                                    {moment.image === 'concert' && '🎤'}
                                    {moment.image === 'library' && '📚'}
                                </div>
                            )}
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-400">{moment.time}</span>
                                <div className="bg-[#F7F7F7] px-2 py-1 rounded text-[#576b95] cursor-pointer hover:bg-gray-200">
                                    <MoreHorizontal size={16} />
                                </div>
                            </div>
                            
                            {/* Likes & Comments Area */}
                            {(moment.likes.length > 0 || moment.comments.length > 0) && (
                                <div className="bg-[#F7F7F7] mt-2 rounded p-2">
                                    {moment.likes.length > 0 && (
                                        <div className="flex items-center gap-1 text-[13px] text-[#576b95] border-b border-gray-200/50 pb-1 mb-1">
                                            <Heart size={12} />
                                            {moment.likes.map(uid => contacts.find(c => c.id === uid)?.name.split(' ')[0]).join(', ')}
                                        </div>
                                    )}
                                    {moment.comments.map((comment, cIdx) => {
                                        const commentUser = contacts.find(c => c.id === comment.user);
                                        return (
                                            <div key={cIdx} className="text-[13px]">
                                                <span className="text-[#576b95] font-medium">{commentUser?.name.split(' ')[0]}:</span>
                                                <span className="text-gray-800 ml-1">{comment.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

const ContactList = ({ contacts, onClick }) => {
    // Group contacts
    const grouped = {
        '星标朋友': [],
        '老师': contacts.filter(c => c.role === '老师'),
        '亲戚': contacts.filter(c => c.role === '亲戚'),
        '搭子': contacts.filter(c => c.role === '搭子'),
        '其他': contacts.filter(c => !['老师', '亲戚', '搭子'].includes(c.role))
    };

    return (
        <div className="pb-16 bg-white">
             <div className="bg-[#F5F5F5] p-2 sticky top-0 z-10 border-b border-gray-200">
                 <h2 className="font-medium px-2">通讯录</h2>
             </div>
             {/* Functional Items */}
             {['新的朋友', '群聊', '标签', '公众号'].map((item, idx) => (
                <div key={idx} className="flex items-center p-3 bg-white border-b border-gray-100">
                     <div className={`w-10 h-10 rounded flex items-center justify-center text-white ${
                         ['bg-orange-400', 'bg-green-500', 'bg-blue-500', 'bg-purple-500'][idx]
                     }`}>
                        <User size={20} />
                     </div>
                     <span className="ml-3 font-medium">{item}</span>
                </div>
            ))}

            {Object.entries(grouped).map(([category, items]) => (
                items.length > 0 && (
                    <div key={category}>
                        <div className="bg-gray-100 px-3 py-1 text-xs text-gray-500">{category}</div>
                        {items.map(contact => (
                            <div key={contact.id} onClick={() => onClick(contact)} className="flex items-center p-3 bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                                <img src={contact.avatar} className="w-10 h-10 rounded bg-gray-200" alt="" />
                                <span className="ml-3 font-medium text-gray-900">{contact.name}</span>
                            </div>
                        ))}
                    </div>
                )
            ))}
        </div>
    );
}

// --- 4. Main App ---
const App = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatHistories, setChatHistories] = useState({}); 
  const [isTyping, setIsTyping] = useState(false);
  const [momentsData, setMomentsData] = useState(INITIAL_MOMENTS);

  useEffect(() => {
    const initialHistory = {};
    ALL_CONTACTS.forEach(c => initialHistory[c.id] = []);
    setChatHistories(initialHistory);
  }, []);

  const handleSendMessage = async (text) => {
    if (!selectedContact) return;
    const cid = selectedContact.id;
    const newMessage = { text, sender: 'me', timestamp: new Date() };
    
    setChatHistories(prev => ({ ...prev, [cid]: [...(prev[cid] || []), newMessage] }));
    setIsTyping(true);

    const reply = await generateAIResponse(selectedContact, chatHistories[cid] || [], text);
    
    setIsTyping(false);
    setChatHistories(prev => ({ 
        ...prev, 
        [cid]: [...(prev[cid] || []), { text: reply, sender: 'them', timestamp: new Date() }] 
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
        case 'chat':
            return (
                <div className="pb-16">
                   <div className="bg-[#F5F5F5] p-2 sticky top-0 z-10">
                      <div className="bg-white rounded-md flex items-center justify-center py-1.5 text-gray-400 text-sm">
                         <Search size={16} className="mr-1" /> 搜索
                      </div>
                   </div>
                  {ALL_CONTACTS.map(contact => {
                      // Only show contacts that have updated messages or were in original list for demo
                      // In real app, sort by time. Here we just show all for access.
                      const history = chatHistories[contact.id];
                      const showMsg = history?.length > 0 ? history[history.length - 1].text : contact.lastMessage;
                      return (
                        <ChatListItem
                          key={contact.id}
                          contact={{ ...contact, lastMessage: showMsg }}
                          onClick={() => setSelectedContact(contact)}
                        />
                      );
                  })}
                </div>
            );
        case 'contacts':
            return <ContactList contacts={ALL_CONTACTS} onClick={setSelectedContact} />;
        case 'discover':
            return (
                <div>
                    <div className="bg-[#F5F5F5] p-3 border-b border-gray-200 sticky top-0 z-20 flex items-center justify-between">
                        <span className="font-medium">发现</span>
                        <Camera size={20} className="text-black" />
                    </div>
                    {/* Menu Items */}
                    <div onClick={() => setActiveTab('moments_feed')} className="bg-white p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 mb-2 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MomentsIcon" className="w-6 h-6" alt="" />
                            <span className="text-[16px]">朋友圈</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <img src={ALL_CONTACTS[0].avatar} className="w-8 h-8 rounded-md" alt="new" />
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                            </div>
                            <ChevronLeft size={16} className="rotate-180 text-gray-400" />
                        </div>
                    </div>
                    {/* Other Discover Items */}
                     {['视频号', '直播', '扫一扫', '看一看', '搜一搜', '小程序'].map((item, i) => (
                        <div key={i} className="bg-white p-3 flex justify-between items-center border-b border-gray-100 hover:bg-gray-50">
                             <div className="flex items-center gap-3">
                                 <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                     <Compass size={14} className="text-blue-500" />
                                 </div>
                                 <span>{item}</span>
                             </div>
                             <ChevronLeft size={16} className="rotate-180 text-gray-400" />
                        </div>
                     ))}
                </div>
            );
        case 'moments_feed': // Virtual tab for feed
            return <Moments contacts={ALL_CONTACTS} moments={momentsData} onLike={() => {}} />;
        case 'me':
            return (
              <div className="bg-[#F5F5F5] min-h-full">
                 <div className="bg-white p-6 mb-2 flex items-center gap-4">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" className="w-16 h-16 rounded-lg bg-gray-200" alt="me" />
                    <div className="flex-1">
                        <h2 className="font-bold text-xl mb-1">我自己</h2>
                        <p className="text-gray-500 text-sm">微信号: ai_master_2025</p>
                    </div>
                    <div className="text-gray-400"><ChevronLeft size={20} className="rotate-180" /></div>
                 </div>
                 {['服务', '收藏', '朋友圈', '卡包', '表情', '设置'].map((item, idx) => (
                     <div key={idx} className={`bg-white p-4 flex justify-between items-center ${idx === 0 ? 'mb-2' : 'border-b border-gray-100'}`}>
                         <span className="text-[16px]">{item}</span>
                         <ChevronLeft size={18} className="rotate-180 text-gray-400" />
                     </div>
                 ))}
              </div>
            );
        default: return null;
    }
  };

  // Handle back from moments feed to discover
  const handleTabChange = (tab) => {
      setActiveTab(tab);
      window.scrollTo(0,0);
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#F5F5F5] flex flex-col shadow-xl overflow-hidden relative font-sans text-gray-900">
      
      {/* Top Header (Conditional) */}
      {!selectedContact && activeTab !== 'moments_feed' && activeTab !== 'me' && activeTab !== 'discover' && (
        <div className="bg-[#F5F5F5] px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-200">
          <span className="font-medium text-[17px]">微信({ALL_CONTACTS.length})</span>
          <div className="flex gap-4">
            <Search size={22} />
            <Plus size={22} className="border border-black rounded-full p-0.5" />
          </div>
        </div>
      )}

       {/* Moments Feed Header (Custom) */}
       {activeTab === 'moments_feed' && (
          <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 opacity-95 border-b border-gray-200">
              <button onClick={() => setActiveTab('discover')} className="flex items-center -ml-2">
                  <ChevronLeft size={24} /> <span className="text-[16px]">发现</span>
              </button>
              <Camera size={22} />
          </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F5F5F5]">
        {renderTabContent()}
      </div>

      {/* Bottom Nav (Hidden in chat or deep views) */}
      {!selectedContact && activeTab !== 'moments_feed' && 
        <BottomNav activeTab={activeTab === 'discover' ? 'discover' : activeTab} setActiveTab={handleTabChange} />
      }

      {/* Chat Overlay */}
      {selectedContact && (
        <ChatInterface
          contact={selectedContact}
          onBack={() => setSelectedContact(null)}
          history={chatHistories[selectedContact.id] || []}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      )}
    </div>
  );
};

export default App;
