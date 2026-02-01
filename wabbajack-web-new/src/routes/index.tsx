import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Download, BookOpen, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModlistCarousel } from '@/components/modlist/ModlistCarousel';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <img
                src="/wabbajack_transparent.webp"
                alt="Wabbajack"
                className="h-32 w-32 mx-auto"
              />
              <div className="absolute inset-0 bg-neon-purple/30 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display font-black text-6xl md:text-8xl tracking-tight mb-4"
          >
            <span className="gradient-text">Wabbajack</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
          >
            The automated modlist installer that brings entire modding setups to life with a single click
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="xl" asChild className="group">
              <a href={EXTERNAL_LINKS.download}>
                <Download className="mr-2 h-5 w-5" />
                Download Now
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href={EXTERNAL_LINKS.wiki} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-5 w-5" />
                Documentation
              </a>
            </Button>
            <Button size="xl" variant="ghost" asChild>
              <Link to="/discord">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Get your perfect modded setup in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Download',
                description: 'Get Wabbajack from GitHub - it\'s free and open source. Just download the launcher and you\'re ready to go.',
                color: 'neon-purple',
              },
              {
                step: '02',
                title: 'Choose',
                description: 'Browse our gallery of curated modlists. Each one is carefully crafted and tested by the community.',
                color: 'neon-pink',
              },
              {
                step: '03',
                title: 'Install',
                description: 'Hit install and let Wabbajack handle the rest. It downloads, organizes, and configures everything automatically.',
                color: 'neon-cyan',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl border border-neon-purple/10 bg-surface/50 backdrop-blur-sm h-full">
                  <div className={`text-6xl font-display font-black text-${item.color}/20 mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Modlists Carousel */}
      <section className="relative py-24 bg-surface/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 mb-6">
              <Sparkles className="h-4 w-4 text-neon-purple" />
              <span className="text-sm text-neon-purple font-medium">Featured Lists</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Discover Amazing Modlists
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Explore curated collections from our community. From vanilla-plus to total overhauls.
            </p>
          </motion.div>

          <ModlistCarousel />

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/gallery">
                View All Modlists
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Platform Support
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-neon-purple/20 bg-surface/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
                  <WindowsIcon className="h-6 w-6 text-neon-blue" />
                </div>
                <h3 className="font-display font-bold text-xl">Windows</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Requires Windows 10/11 Home or Pro. LTSC, IoT Enterprise, and modified Windows versions are not supported.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-neon-purple/20 bg-surface/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20">
                  <LinuxIcon className="h-6 w-6 text-neon-cyan" />
                </div>
                <h3 className="font-display font-bold text-xl">Linux</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Community-maintained guides available for running via Proton. Check the{' '}
                <a
                  href={EXTERNAL_LINKS.linuxGuide}
                  className="text-neon-cyan hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linux guide
                </a>{' '}
                or{' '}
                <a
                  href={EXTERNAL_LINKS.linuxDiscordChannel}
                  className="text-neon-cyan hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord channel
                </a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.35-.2.553.553 0 00.134-.335c.003-.2-.05-.335-.156-.468a1.45 1.45 0 00-.35-.4 2.21 2.21 0 00-.698-.533 7.83 7.83 0 00-.481-.198" />
    </svg>
  );
}
