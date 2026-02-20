import { Bell, Menu, Search, User, Settings, LogOut, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface SearchResult {
  type: 'patient' | 'doctor' | 'resource';
  data: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
}

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationAsRead, patients, doctors, resources } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search patients
    patients.forEach(patient => {
      if (
        patient.name.toLowerCase().includes(query) ||
        patient.contact.toLowerCase().includes(query) ||
        patient.bloodGroup.toLowerCase().includes(query)
      ) {
        results.push({ type: 'patient', data: patient });
      }
    });

    // Search doctors
    doctors.forEach(doctor => {
      if (
        doctor.name.toLowerCase().includes(query) ||
        doctor.department.toLowerCase().includes(query)
      ) {
        results.push({ type: 'doctor', data: doctor });
      }
    });

    // Search resources
    resources.forEach(resource => {
      if (
        resource.name.toLowerCase().includes(query) ||
        resource.type.toLowerCase().includes(query)
      ) {
        results.push({ type: 'resource', data: resource });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowResults(results.length > 0);
  }, [searchQuery, patients, doctors, resources]);

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery('');
    setShowResults(false);
    
    if (result.type === 'patient') {
      navigate('/patients');
    } else if (result.type === 'doctor') {
      navigate('/doctors');
    } else if (result.type === 'resource') {
      navigate('/resources');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Search with Results */}
        <div className="hidden md:block relative" ref={searchRef}>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-72">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients, doctors, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="hover:bg-background rounded p-1">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {searchResults.map((result, index) => (
                <button
                  key={`${result.type}-${result.data.id}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 hover:bg-muted transition-colors text-left border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      result.type === 'patient' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                      result.type === 'doctor' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {result.type === 'patient' ? 'P' : result.type === 'doctor' ? 'D' : 'R'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{result.data.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.type === 'patient' && `${result.data.age} yrs • ${result.data.bloodGroup}`}
                        {result.type === 'doctor' && result.data.department}
                        {result.type === 'resource' && `${result.data.available}/${result.data.total} available`}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {result.type}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {showResults && searchResults.length === 0 && searchQuery.length >= 2 && (
            <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg p-4 z-50">
              <p className="text-sm text-muted-foreground text-center">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-normal'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      {notification.read && (
                        <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-center justify-center text-primary cursor-pointer"
                  onClick={() => navigate('/notifications')}
                >
                  View all notifications
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground leading-tight">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
