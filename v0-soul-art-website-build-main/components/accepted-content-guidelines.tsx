'use client';

export default function AcceptedContentGuidelines() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-12">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Accepted Content Guidelines
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            SoulArt celebrates original, creative expression. Here's what you can confidently share with our community.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Accepted Content */}
          <div className="space-y-6 animate-slideInLeft">
            <div className="group">
              <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="text-3xl">✨</span> What You Can Upload
              </h3>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 card-hover">
                <ul className="space-y-3">
                  {[
                    'Original meme art & designs',
                    'Unique meme characters & animations',
                    'Hand-drawn cartoons & illustrations',
                    'Portrait drawings & digital art',
                    'Still-life & study artwork',
                    'Pottery photography & ceramics',
                    'Nature & landscape photography',
                    'Environment & lifestyle imagery',
                    'Any original, self-created work',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <span className="text-green-400 font-bold mt-0.5">+</span>
                      <span className="text-slate-300 group-hover/item:text-slate-100 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Warning Section */}
          <div className="space-y-6 animate-slideInRight">
            <div className="group">
              <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="text-3xl">⚠️</span> What Not to Upload
              </h3>
              <div className="bg-slate-800/50 backdrop-blur border border-red-500/30 rounded-xl p-6 card-hover">
                <ul className="space-y-3 mb-6">
                  {[
                    'AI-generated artwork or images',
                    'Content found on the internet',
                    'Plagiarized or copied material',
                    'Stolen artwork from other creators',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <span className="text-red-400 font-bold mt-0.5">—</span>
                      <span className="text-slate-300 group-hover/item:text-slate-100 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* AI Detection Warning */}
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mt-6">
                  <p className="text-red-300 text-sm leading-relaxed">
                    <span className="font-semibold">Advanced Detection System:</span> SoulArt uses AI verification technology and reverse-image search to detect plagiarism and AI-generated content. Submissions flagged as unauthorized will be rejected and the creator may face review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Standards */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8 animate-slideInUp scroll-scale">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span>🎯</span> Our Community Standards
          </h3>
          <p className="text-slate-300 leading-relaxed">
            We believe in celebrating authentic creativity. Every piece you upload should represent your own artistic vision, effort, and talent. When you share original work, you're not just uploading content—you're joining a community of genuine creators committed to ethical, original expression. Let's keep SoulArt a space where real artists thrive.
          </p>
        </div>
      </div>
    </section>
  );
}
