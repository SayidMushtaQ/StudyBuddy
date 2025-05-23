import React, { useState, useEffect } from 'react';
import { Upload, FileText, Clock, CheckCircle, Loader, ArrowLeft, ExternalLink } from 'lucide-react';

const PDFSummarizerApp = () => {
  const [documents, setDocuments] = useState([]);
  const [uploadForm, setUploadForm] = useState({ title: '', file: null });
  const [processingDocs, setProcessingDocs] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock existing documents
  useEffect(() => {
    const mockDocs = [
      {
        id: 1,
        title: "Research Paper on AI",
        summary: "This paper explores the latest developments in artificial intelligence, focusing on machine learning algorithms and their applications in various industries. The research highlights significant advancements in neural networks and their potential impact on future technological innovations.",
        fullContent: "This comprehensive research paper delves deep into the current state of artificial intelligence, examining breakthrough developments in machine learning algorithms and their widespread applications across multiple industries. The study provides detailed analysis of neural network architectures, deep learning methodologies, and their transformative potential in sectors ranging from healthcare and finance to autonomous systems and natural language processing. Key findings include significant performance improvements in computer vision tasks, enhanced natural language understanding capabilities, and promising developments in reinforcement learning applications. The paper also discusses ethical considerations, implementation challenges, and future research directions that will shape the next generation of AI technologies.",
        uploaded_at: "2025-05-20T10:30:00Z",
        status: 'completed',
        fileSize: "2.4 MB",
        pages: 45
      },
      {
        id: 2,
        title: "Business Strategy Report",
        summary: "A comprehensive analysis of market trends and strategic recommendations for business growth. The report covers competitive analysis, market opportunities, and strategic initiatives that can drive sustainable business development.",
        fullContent: "This detailed business strategy report presents a thorough examination of current market dynamics, emerging trends, and strategic opportunities for organizational growth and development. The analysis encompasses comprehensive competitive intelligence, market segmentation studies, and identification of key growth drivers in the contemporary business landscape. Strategic recommendations include market penetration strategies, product diversification opportunities, digital transformation initiatives, and sustainable business practices that align with evolving consumer preferences and regulatory requirements. The report also provides implementation frameworks, risk assessment methodologies, and performance metrics to guide strategic decision-making and ensure successful execution of recommended initiatives.",
        uploaded_at: "2025-05-19T14:15:00Z",
        status: 'completed',
        fileSize: "1.8 MB",
        pages: 32
      }
    ];
    setDocuments(mockDocs);
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleFileUpload = async () => {
    if (!uploadForm.title.trim()) {
      showMessage('error', 'Please enter a title.');
      return;
    }
    
    if (!uploadForm.file) {
      showMessage('error', 'Please select a PDF file.');
      return;
    }

    if (!uploadForm.file.name.endsWith('.pdf')) {
      showMessage('error', 'Please upload a PDF file.');
      return;
    }

    // Create processing document
    const processingDoc = {
      id: Date.now(),
      title: uploadForm.title,
      uploaded_at: new Date().toISOString(),
      status: 'processing'
    };

    setProcessingDocs(prev => [...prev, processingDoc]);
    setUploadForm({ title: '', file: null });
    showMessage('success', 'PDF uploaded successfully! Processing started...');

    // Simulate processing delay
    setTimeout(() => {
      const completedDoc = {
        ...processingDoc,
        summary: `This is a comprehensive summary of "${processingDoc.title}". The AI has processed the document and extracted key insights, main themes, and important information. The analysis reveals significant findings and provides valuable insights into the document's core content and implications.`,
        fullContent: `This detailed analysis of "${processingDoc.title}" provides comprehensive insights into the document's core themes and key findings. The AI-powered processing has identified critical information, extracted main arguments, and synthesized complex concepts into accessible summaries. The document contains valuable insights that contribute to understanding of the subject matter, presenting well-researched information and thoughtful analysis. Key sections include detailed explanations, supporting evidence, and conclusive recommendations that provide actionable insights for readers and stakeholders.`,
        status: 'completed',
        fileSize: "1.2 MB",
        pages: Math.floor(Math.random() * 30) + 15
      };

      setProcessingDocs(prev => prev.filter(doc => doc.id !== processingDoc.id));
      setDocuments(prev => [completedDoc, ...prev]);
      showMessage('success', 'Summary generated successfully!');
    }, 4000);
  };

  const handleDocumentClick = (doc) => {
    if (doc.status === 'completed') {
      setSelectedDoc(doc);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoc(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const MessageAlert = () => {
    if (!message.text) return null;
    
    const bgColor = message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    
    return (
      <div className={`border-l-4 p-4 mb-6 ${bgColor}`}>
        <p>{message.text}</p>
      </div>
    );
  };

  const UploadCard = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Upload className="mr-3" size={24} />
          Upload PDF for AI Summarization
        </h2>
        <p className="text-blue-100 mt-1">Upload your PDF documents and get instant AI-powered summaries</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              id="title"
              value={uploadForm.title}
              onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter a descriptive title for your document"
            />
          </div>
          <div>
            <label htmlFor="pdf-file" className="block text-sm font-semibold text-gray-700 mb-2">
              PDF File
            </label>
            <div className="relative">
              <input
                type="file"
                id="pdf-file"
                accept=".pdf"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {uploadForm.file && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  {uploadForm.file.name}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleFileUpload}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold shadow-lg"
          >
            <Upload size={20} />
            <span>Upload & Generate Summary</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProcessingCard = ({ doc }) => (
    <div className="bg-white rounded-lg shadow-md border border-blue-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{doc.title}</h3>
          <div className="flex items-center text-blue-600 ml-2 flex-shrink-0">
            <Loader className="animate-spin mr-1" size={16} />
            <span className="text-xs font-medium">Processing</span>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="flex items-center mb-1">
            <div className="animate-pulse bg-blue-400 w-2 h-2 rounded-full mr-2"></div>
            <span className="text-xs font-medium text-blue-800">AI is analyzing...</span>
          </div>
          <p className="text-xs text-blue-700">
            Processing your PDF and extracting key insights.
          </p>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>Uploaded: {formatDate(doc.uploaded_at)}</span>
        </div>
      </div>
    </div>
  );

  const SummaryCard = ({ doc }) => (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:border-blue-300"
      onClick={() => handleDocumentClick(doc)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 pr-2">{doc.title}</h3>
          <div className="flex items-center text-green-600 ml-2 flex-shrink-0">
            <CheckCircle size={16} className="mr-1" />
            <ExternalLink size={14} className="ml-1 opacity-60" />
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <FileText size={14} className="mr-1 text-blue-600" />
            AI Summary
          </h4>
          <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">{doc.summary}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{formatDate(doc.uploaded_at)}</span>
          </div>
          {doc.pages && (
            <span className="text-gray-400">{doc.pages} pages</span>
          )}
        </div>
      </div>
    </div>
  );

  const DocumentModal = ({ doc, isOpen, onClose }) => {
    if (!isOpen || !doc) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{doc.title}</h2>
              <div className="flex items-center space-x-4 mt-1 text-blue-100 text-sm">
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {formatDate(doc.uploaded_at)}
                </span>
                {doc.fileSize && (
                  <span className="flex items-center">
                    <FileText size={14} className="mr-1" />
                    {doc.fileSize}
                  </span>
                )}
                {doc.pages && (
                  <span>{doc.pages} pages</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FileText size={18} className="mr-2 text-blue-600" />
                AI Summary
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{doc.summary}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <MessageAlert />
      
      {/* Upload Section */}
      <UploadCard />
      
      {/* Documents Grid */}
      {(processingDocs.length > 0 || documents.length > 0) && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="mr-3" size={28} />
            Your Documents
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Processing Documents */}
            {processingDocs.map((doc) => (
              <ProcessingCard key={`processing-${doc.id}`} doc={doc} />
            ))}
            
            {/* Completed Documents */}
            {documents.map((doc) => (
              <SummaryCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {processingDocs.length === 0 && documents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
          <FileText size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No documents yet</h3>
          <p className="text-gray-500">Upload your first PDF to get started with AI summarization</p>
        </div>
      )}
      
      {/* Document Modal */}
      <DocumentModal 
        doc={selectedDoc} 
        isOpen={showModal} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default PDFSummarizerApp;