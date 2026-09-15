import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Camera,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Trash2,
  Sparkles,
  Upload,
  Layers,
  Heart,
  Search,
  ExternalLink,
  Award
} from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { GALLERY_MEMORIES, PERSONAL_INFO } from '../data/portfolioData';
import { GalleryMemoryItem } from '../types';

const LOCAL_STORAGE_KEY = 'sakibulhabib_custom_memories_v1';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'polaroid'>('grid');
  const [userMemories, setUserMemories] = useState<GalleryMemoryItem[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<GalleryMemoryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [likedMemoryIds, setLikedMemoryIds] = useState<Set<string>>(new Set());

  // Form state for new memory upload
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('Dhaka, Bangladesh');
  const [newCategory, setNewCategory] = useState<GalleryMemoryItem['category']>('Personal');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom memories from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUserMemories(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read custom memories from storage', e);
    }
  }, []);

  // Save custom memories
  const saveCustomMemories = (items: GalleryMemoryItem[]) => {
    setUserMemories(items);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save to storage', e);
    }
  };

  // Combine initial curated memories and user custom uploads
  const allMemories = useMemo(() => {
    return [...userMemories, ...GALLERY_MEMORIES];
  }, [userMemories]);

  // Categories list
  const categories = ['All', 'Milestone', 'Academic & Campus', 'Career & Leadership', 'Teaching & Lab', 'Personal'];

  // Filtered memories
  const filteredMemories = useMemo(() => {
    return allMemories.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category === activeCategory ||
        (activeCategory === 'Personal' && item.isUserUploaded);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.year.toLowerCase().includes(query) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [allMemories, activeCategory, searchQuery]);

  // Handle file selection and conversion to base64 data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setNewImagePreview(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview) {
      alert('Please select or drag in an image for this memory.');
      return;
    }
    if (!newTitle.trim()) {
      alert('Please provide a title for the memory.');
      return;
    }

    const newMemoryItem: GalleryMemoryItem = {
      id: `user-memory-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      year: newYear.trim() || new Date().getFullYear().toString(),
      date: newDate.trim() || undefined,
      location: newLocation.trim() || 'Dhaka, Bangladesh',
      description: newDescription.trim() || 'A cherished personal memory and milestone.',
      imageUrl: newImagePreview,
      isUserUploaded: true,
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: false,
    };

    saveCustomMemories([newMemoryItem, ...userMemories]);

    // Reset form
    setNewTitle('');
    setNewDate('');
    setNewDescription('');
    setNewTags('');
    setNewImagePreview('');
    setIsUploadModalOpen(false);
  };

  const handleDeleteUserMemory = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('Are you sure you want to delete this memory from your album?')) {
      const updated = userMemories.filter((m) => m.id !== id);
      saveCustomMemories(updated);
      if (selectedMemory?.id === id) {
        setSelectedMemory(null);
      }
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMemoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Lightbox navigation
  const currentIndex = selectedMemory
    ? filteredMemories.findIndex((m) => m.id === selectedMemory.id)
    : -1;

  const handlePrevMemory = () => {
    if (currentIndex > 0) {
      setSelectedMemory(filteredMemories[currentIndex - 1]);
    } else if (filteredMemories.length > 0) {
      setSelectedMemory(filteredMemories[filteredMemories.length - 1]);
    }
  };

  const handleNextMemory = () => {
    if (currentIndex < filteredMemories.length - 1) {
      setSelectedMemory(filteredMemories[currentIndex + 1]);
    } else if (filteredMemories.length > 0) {
      setSelectedMemory(filteredMemories[0]);
    }
  };

  return (
    <section id="gallery" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>PHOTO GALLERY & MEMORIES ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Memories & Photographic Moments
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            A nostalgic retrospective of Khondoker Sakibul Habib Sakib’s journey—spanning university convocation at IUBAT, engineering lab lectures at UCASM, IT leadership at Plannet Group, hackathons, and personal milestones.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Action Bar: Search, Category Filters, View Switcher & Add Memory Button */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? allMemories.length
                  : cat === 'Personal'
                  ? allMemories.filter((m) => m.category === 'Personal' || m.isUserUploaded).length
                  : allMemories.filter((m) => m.category === cat).length;

              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                      : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Tools: Search & Add Photo */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('polaroid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'polaroid'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Polaroid Album View"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Memory Button */}
            <button
              type="button"
              id="add-memory-button"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Memory</span>
            </button>
          </div>
        </div>

        {/* Featured Sakib Passport Tribute Banner if All or Milestone is active */}
        {(activeCategory === 'All' || activeCategory === 'Milestone') && !searchQuery && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/30 backdrop-blur-md shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative z-10">
              <div
                className="relative group cursor-pointer shrink-0"
                onClick={() => setSelectedMemory(allMemories.find((m) => m.id === 'memory-passport-official') || allMemories[0])}
              >
                <div className="w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/25 bg-slate-800">
                  <img
                    src="./my-passport-photo.png"
                    alt="Khondoker Sakibul Habib Sakib Official"
                    className="w-full h-full object-cover object-[50%_14%] group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/my-passport-photo.png';
                      }
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 p-1 rounded-full bg-cyan-500 text-slate-950 shadow-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono mb-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>PRIMARY PORTFOLIO PROFILE ARCHIVE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Khondoker Sakibul Habib Sakib
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Head of IT at City Tech IT (Plannet Group), Lecturer in Computer Science & Engineering at UCASM, and Program Coordination, Academic Faculty at UCAST.
                  This archive preserves authentic memories from the classroom, boardroom, laboratory, and student mentorship sessions.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> Uttara & Gulshan-1, Dhaka
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-400" /> Head of IT • Lecturer (UCASM) • Program Coordination
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedMemory(allMemories.find((m) => m.id === 'memory-passport-official') || allMemories[0])}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 flex items-center gap-1"
                  >
                    View Official Photo Card & Notes →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Content */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <Camera className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              No memories found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No photos matched the category or search criteria. Click &quot;Add Memory&quot; to upload your own photos!
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Standard 3D Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMemories.map((memory) => {
              const isLiked = likedMemoryIds.has(memory.id);
              return (
                <div
                  key={memory.id}
                  id={`gallery-item-${memory.id}`}
                  onClick={() => setSelectedMemory(memory)}
                  className="cursor-pointer group"
                >
                  <Card3D intensity={12} glowColor="cyan" className="h-full flex flex-col overflow-hidden">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Image Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Year badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-cyan-300 text-[10px] font-mono flex items-center gap-1 shadow">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{memory.year}</span>
                      </div>

                      {/* Category & Like Badge */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => toggleLike(memory.id, e)}
                          className={`p-1.5 rounded-full backdrop-blur-md border transition-all ${
                            isLiked
                              ? 'bg-red-500/90 border-red-400 text-white shadow-md shadow-red-500/30'
                              : 'bg-slate-950/70 border-slate-700/60 text-slate-300 hover:text-red-400'
                          }`}
                          title="Love this memory"
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        {memory.isUserUploaded && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteUserMemory(memory.id, e)}
                            className="p-1.5 rounded-full bg-slate-950/70 border border-slate-700/60 text-slate-400 hover:text-rose-400 backdrop-blur-md transition-colors"
                            title="Delete memory"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Location Badge */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-200">
                        <span className="truncate flex items-center gap-1 max-w-[80%] font-mono text-[10px] text-slate-300 drop-shadow">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{memory.location}</span>
                        </span>
                        <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900/90">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
                          <span>{memory.category}</span>
                          {memory.date && <span>• {memory.date}</span>}
                        </div>
                        <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {memory.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {memory.description}
                        </p>
                      </div>

                      {/* Tags */}
                      {memory.tags && memory.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          {memory.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                          {memory.tags.length > 3 && (
                            <span className="text-[9px] font-mono px-1 rounded text-slate-400">
                              +{memory.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Card3D>
                </div>
              );
            })}
          </div>
        ) : (
          /* Polaroid / Album View Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4">
            {filteredMemories.map((memory, i) => {
              const rotateStyles = [
                '-rotate-1 hover:rotate-0',
                'rotate-1 hover:rotate-0',
                '-rotate-2 hover:rotate-0',
                'rotate-2 hover:rotate-0',
              ];
              const rotation = rotateStyles[i % rotateStyles.length];

              return (
                <div
                  key={memory.id}
                  onClick={() => setSelectedMemory(memory)}
                  className={`cursor-pointer transition-all duration-300 transform ${rotation} hover:scale-105 hover:z-20 group`}
                >
                  <div className="p-3 pb-5 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl dark:shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col relative">
                    {/* Washi tape pin effect on top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/80 dark:bg-cyan-950/90 border border-amber-300/60 dark:border-cyan-700/60 shadow-sm backdrop-blur-sm -rotate-2" />

                    {/* Photo Square */}
                    <div className="w-full aspect-square bg-slate-900 overflow-hidden rounded-sm relative mb-3">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-cyan-300 text-[9px] font-mono">
                        {memory.year}
                      </div>
                    </div>

                    {/* Handwriting style caption */}
                    <div className="px-1 space-y-1">
                      <h4 className="text-xs font-bold font-heading truncate text-slate-800 dark:text-slate-100">
                        {memory.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 font-mono">
                        <MapPin className="w-2.5 h-2.5 text-cyan-500 shrink-0" />
                        <span>{memory.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          id="memory-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border border-slate-700/60 shadow-lg"
              title="Close viewer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left/Top: High-res Photo Preview with Next/Prev controls */}
            <div className="relative md:w-3/5 bg-slate-950 flex items-center justify-center min-h-[300px] md:min-h-[460px] overflow-hidden">
              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                className="w-full h-full object-contain max-h-[500px]"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevMemory}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-lg"
                title="Previous memory"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextMemory}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-lg"
                title="Next memory"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-slate-700">
                {currentIndex + 1} / {filteredMemories.length}
              </div>
            </div>

            {/* Right/Bottom: Memory Narrative & Meta Details */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-semibold border border-cyan-300 dark:border-cyan-800">
                    {selectedMemory.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {selectedMemory.year}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white leading-tight">
                  {selectedMemory.title}
                </h3>

                {selectedMemory.date && (
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedMemory.date}</span>
                  </p>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{selectedMemory.location}</span>
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Memory Story & Context
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedMemory.description}
                  </p>
                </div>

                {selectedMemory.tags && selectedMemory.tags.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Tags
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMemory.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedMemory.id, e)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                    likedMemoryIds.has(selectedMemory.id)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMemoryIds.has(selectedMemory.id) ? 'fill-current' : ''}`} />
                  <span>{likedMemoryIds.has(selectedMemory.id) ? 'Favorited' : 'Favorite'}</span>
                </button>

                {selectedMemory.isUserUploaded ? (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteUserMemory(selectedMemory.id, e)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Photo</span>
                  </button>
                ) : (
                  <a
                    href={selectedMemory.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Full Resolution</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Memory Modal */}
      {isUploadModalOpen && (
        <div
          id="upload-memory-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Add Photo & Preserve Memory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload your old photos from campus, college, lab, or family moments.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              {/* Photo selector / drag & drop box */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Select Photo *
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {newImagePreview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-cyan-500 bg-slate-950 group">
                    <img
                      src={newImagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setNewImagePreview('')}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-950/80 text-rose-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 text-xs text-cyan-300 border border-slate-700 hover:bg-cyan-500 hover:text-slate-950 font-mono"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-36 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50 dark:bg-slate-950/50 transition-colors"
                  >
                    <ImageIcon className="w-8 h-8 text-cyan-500 mb-2 opacity-80" />
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                      Click to browse or drop an old photo
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG, WEBP</p>
                  </div>
                )}
              </div>

              {/* Title & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Memory Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UCASM Annual Gathering"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Year / Era *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as GalleryMemoryItem['category'])}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Personal">Personal & Nostalgia</option>
                    <option value="Milestone">Milestone & Achievement</option>
                    <option value="Academic & Campus">Academic & Campus Days</option>
                    <option value="Career & Leadership">Career & Leadership</option>
                    <option value="Teaching & Lab">Teaching & Lab Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Uttara Sector 3, Dhaka"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Story / Description */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                  Memory Description & Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a short story, who was there, and why this photo is memorable..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Friends, University, Lab, 2022"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20"
                >
                  Save Photo to Memories
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
