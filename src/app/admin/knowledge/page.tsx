'use client';

import { useEffect, useState } from 'react';
import { Trash2, FileText, Link2, FileUp, Plus, RefreshCw, Loader2 } from 'lucide-react';

interface KnowledgeSource {
  id: string;
  type: 'text' | 'pdf' | 'url';
  title: string;
  content?: string;
  fileName?: string;
  url?: string;
  vectorIds: string[];
  createdAt: string;
  metadata?: Record<string, unknown>;
}

type AddMode = 'none' | 'text' | 'pdf' | 'url';

export default function AdminKnowledgePage() {
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addMode, setAddMode] = useState<AddMode>('none');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [urlTitle, setUrlTitle] = useState('');
  const [urlValue, setUrlValue] = useState('');

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const response = await fetch('/api/admin/knowledge');
      const data = await response.json();
      setSources(data.sort((a: KnowledgeSource, b: KnowledgeSource) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Error fetching knowledge sources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this knowledge source? This will also remove it from the vector database.')) {
      return;
    }

    setDeleteId(id);
    try {
      const response = await fetch(`/api/admin/knowledge?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSources(sources.filter((source) => source.id !== id));
      } else {
        alert('Failed to delete knowledge source');
      }
    } catch (error) {
      console.error('Error deleting knowledge source:', error);
      alert('Failed to delete knowledge source');
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textTitle.trim() || !textContent.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/knowledge/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: textTitle, content: textContent }),
      });

      if (response.ok) {
        const data = await response.json();
        setSources([data.source, ...sources]);
        setTextTitle('');
        setTextContent('');
        setAddMode('none');
        alert('Text document added successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add text document');
      }
    } catch (error) {
      console.error('Error adding text:', error);
      alert('Failed to add text document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfTitle.trim() || !pdfFile) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', pdfTitle);
      formData.append('file', pdfFile);

      const response = await fetch('/api/admin/knowledge/pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSources([data.source, ...sources]);
        setPdfTitle('');
        setPdfFile(null);
        setAddMode('none');
        alert('PDF document added successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add PDF document');
      }
    } catch (error) {
      console.error('Error adding PDF:', error);
      alert('Failed to add PDF document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlTitle.trim() || !urlValue.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/knowledge/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: urlTitle, url: urlValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setSources([data.source, ...sources]);
        setUrlTitle('');
        setUrlValue('');
        setAddMode('none');
        alert('URL content added successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add URL content');
      }
    } catch (error) {
      console.error('Error adding URL:', error);
      alert('Failed to add URL content');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'pdf':
        return <FileUp className="w-5 h-5" />;
      case 'url':
        return <Link2 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-blue-500';
      case 'pdf':
        return 'bg-red-500';
      case 'url':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
          <p className="text-gray-600">Total: {sources.length} documents</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSources}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Add New Document Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Document</h2>

        {addMode === 'none' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setAddMode('text')}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Text Input</h3>
              </div>
              <p className="text-sm text-gray-600">Add custom text content</p>
            </button>

            <button
              onClick={() => setAddMode('pdf')}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">PDF Upload</h3>
              </div>
              <p className="text-sm text-gray-600">Upload and extract PDF content</p>
            </button>

            <button
              onClick={() => setAddMode('url')}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Link2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">URL Scraper</h3>
              </div>
              <p className="text-sm text-gray-600">Scrape content from URL</p>
            </button>
          </div>
        ) : (
          <div>
            {/* Text Form */}
            {addMode === 'text' && (
              <form onSubmit={handleAddText} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                    placeholder="Enter document title"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Content</label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter the text content (minimum 50 characters)"
                    rows={8}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {textContent.length} characters
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || textContent.length < 50}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add Document
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddMode('none');
                      setTextTitle('');
                      setTextContent('');
                    }}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* PDF Form */}
            {addMode === 'pdf' && (
              <form onSubmit={handleAddPdf} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={pdfTitle}
                    onChange={(e) => setPdfTitle(e.target.value)}
                    placeholder="Enter document title"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">PDF File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                  {pdfFile && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected: {pdfFile.name} ({(pdfFile.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !pdfFile}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add PDF
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddMode('none');
                      setPdfTitle('');
                      setPdfFile(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* URL Form */}
            {addMode === 'url' && (
              <form onSubmit={handleAddUrl} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                    placeholder="Enter document title"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">URL</label>
                  <input
                    type="url"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="https://example.com/page"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add URL Content
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddMode('none');
                      setUrlTitle('');
                      setUrlValue('');
                    }}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Knowledge Sources List */}
      {sources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-600">
            No knowledge sources yet. Add your first document using the forms above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sources.map((source) => (
            <div
              key={source.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`${getTypeColor(source.type)} p-3 rounded-lg text-white`}>
                    {getTypeIcon(source.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{source.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="capitalize">{source.type}</span>
                      <span>•</span>
                      <span>{source.vectorIds.length} vectors</span>
                      <span>•</span>
                      <span>{formatDate(source.createdAt)}</span>
                    </div>
                    {source.fileName && (
                      <p className="text-sm text-gray-600">File: {source.fileName}</p>
                    )}
                    {source.url && (
                      <p className="text-sm text-gray-600 break-all">
                        URL: <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{source.url}</a>
                      </p>
                    )}
                    {source.content && source.type === 'text' && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {source.content.slice(0, 200)}...
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(source.id)}
                  disabled={deleteId === source.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete knowledge source"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
