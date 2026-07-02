import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ChevronLeft, MessageSquare, Send, Users, ThumbsUp, Reply, Trash2, RefreshCw, Search, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: number;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    author: "KaliMaster",
    avatar: "🦾",
    content: "Welcome to the security research community! Penetration testing is LEGAL ONLY on systems you own or have written authorization for. Always practice in isolated lab environments.",
    timestamp: Date.now() - 3600000,
    likes: 12,
    replies: [
      { id: "r1", author: "SecurityPro", content: "Important reminder! Thanks for maintaining ethical standards.", timestamp: Date.now() - 1800000 }
    ]
  },
  {
    id: "2",
    author: "NetHunter",
    avatar: "🎯",
    content: "Anyone have tips for optimizing Nmap scans on wireless networks with IoT devices? Looking for stealth techniques.",
    timestamp: Date.now() - 7200000,
    likes: 5,
    replies: []
  },
  {
    id: "3",
    author: "ThreatIntel",
    avatar: "🛡️",
    content: "New CVE-2024-XXXXX published for Apache Log4j. Check your assets immediately. Metasploit module already available.",
    timestamp: Date.now() - 10800000,
    likes: 8,
    replies: [
      { id: "r2", author: "Pentester", content: "Module working perfectly. Tested in lab environment.", timestamp: Date.now() - 9000000 }
    ]
  }
];

export default function Community() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("community-messages");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch {
        setMessages(defaultMessages);
      }
    } else {
      setMessages(defaultMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("community-messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const name = authorName.trim() || "Anonymous";
    const message: Message = {
      id: Date.now().toString(),
      author: name,
      avatar: name === "Anonymous" ? "👤" : name.charAt(0).toUpperCase(),
      content: newMessage,
      timestamp: Date.now(),
      likes: 0,
      replies: []
    };
    setMessages([message, ...messages]);
    setNewMessage("");
    toast.success("Message transmitted");
  };

  const sendReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    const name = authorName.trim() || "Anonymous";
    const reply: Reply = {
      id: Date.now().toString(),
      author: name,
      content: replyContent,
      timestamp: Date.now()
    };
    setMessages(messages.map(msg =>
      msg.id === parentId
        ? { ...msg, replies: [...msg.replies, reply] }
        : msg
    ));
    setReplyContent("");
    setReplyTo(null);
    toast.success("Reply transmitted");
  };

  const likeMessage = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    toast.success("Message deleted");
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineUsers = new Set(messages.map(m => m.author)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                KALI-GUIDE-HUB
              </h1>
              <p className="text-xs text-gray-500">Community</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /home
              </span>
            </Link>
            <Link href="/guides">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /guides
              </span>
            </Link>
            <Link href="/tools">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /tools
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-4xl">
          <SecurityWarning />
          
          <div className="mb-8 animate-fade-in-up">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-400 hover:text-orange-500 mb-6 font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                cd ..
              </Button>
            </Link>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-bold text-white mb-4 font-mono">
                  Security Research Community
                </h1>
                <p className="text-xl text-gray-300">
                  Discuss ethical hacking, share techniques, and learn from security professionals.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-gray-900/50 border border-orange-500/30 rounded-lg px-4 py-2">
                <Users className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-semibold font-mono">{onlineUsers}</div>
                  <div className="text-gray-400 text-xs font-mono">ACTIVE USERS</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search messages, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 font-mono"
              />
            </div>
          </div>

          <Card className="p-6 bg-gray-900/50 border-gray-700 mb-8">
            <div className="space-y-4">
              <Input
                placeholder="Your callsign..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-[#0A0A0F] border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 font-mono"
              />
              <Textarea
                placeholder="Share security insights, ask questions, discuss techniques..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#0A0A0F] border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 min-h-[120px] font-mono"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    sendMessage();
                  }
                }}
              />
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs font-mono">Ctrl+Enter to transmit</p>
                <Button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-300 font-mono"
                >
                  <Send className="w-4 h-4 mr-2" />
                  TRANSMIT
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <Card className="p-8 bg-gray-900/50 border-gray-700 text-center">
                <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 font-mono">No messages found. Start the conversation!</p>
              </Card>
            ) : (
              filteredMessages.map((msg) => (
                <Card key={msg.id} className="p-6 bg-gray-900/50 border-gray-700 hover:border-orange-500/30 transition-all card-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white font-mono">{msg.author}</span>
                          <span className="text-gray-500 text-xs font-mono">{formatTime(msg.timestamp)}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMessage(msg.id)}
                          className="text-gray-500 hover:text-red-400 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-gray-300 mb-4 font-mono">{msg.content}</p>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => likeMessage(msg.id)}
                          className="text-gray-400 hover:text-orange-500 h-8 gap-1 font-mono"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{msg.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyTo(msg.id)}
                          className="text-gray-400 hover:text-orange-500 h-8 gap-1 font-mono"
                        >
                          <Reply className="w-4 h-4" />
                          <span className="text-sm">REPLY</span>
                        </Button>
                      </div>

                      {msg.replies.length > 0 && (
                        <div className="mt-4 space-y-4 pl-4 border-l-2 border-orange-500/30">
                          {msg.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 text-sm flex-shrink-0">
                                {reply.author.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-200 text-sm font-mono">{reply.author}</span>
                                  <span className="text-gray-500 text-xs font-mono">{formatTime(reply.timestamp)}</span>
                                </div>
                                <p className="text-gray-400 text-sm font-mono">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {replyTo === msg.id && (
                        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="bg-[#0A0A0F] border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 mb-3 min-h-[80px] font-mono"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyTo(null)}
                              className="text-gray-400 hover:text-white font-mono"
                            >
                              CANCEL
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => sendReply(msg.id)}
                              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-mono"
                            >
                              <Reply className="w-4 h-4 mr-1" />
                              REPLY
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-4 justify-between mt-12">
            <Link href="/tools">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-mono"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                cd tools
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
        <div className="container py-8 text-center text-gray-400 text-sm font-mono">
          <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL.</p>
        </div>
      </footer>
    </div>
  );
}