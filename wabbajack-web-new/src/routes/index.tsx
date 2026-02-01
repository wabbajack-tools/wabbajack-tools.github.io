import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ModlistCarousel } from '@/components/modlist/ModlistCarousel';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mt-8 text-center">
        <motion.h1
          className="font-title text-wabbajack-purple-light text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wabbajack
        </motion.h1>
        <motion.h2
          className="font-subtitle mt-2 text-gray-200 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          An automated Modlist installer
        </motion.h2>

        {/* Action Buttons */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto w-full flex justify-center gap-3 px-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button asChild size="lg" className="flex-grow text-xl py-1">
            <a href={EXTERNAL_LINKS.download}>Download</a>
          </Button>
          <Button asChild size="lg" className="flex-grow text-xl py-1">
            <a href={EXTERNAL_LINKS.wiki} target="_blank" rel="noopener noreferrer">
              Wiki/Documentation
            </a>
          </Button>
          <Button asChild size="lg" className="flex-grow text-xl py-1">
            <Link to="/discord">Discord</Link>
          </Button>
        </motion.div>
      </div>

      {/* Step Cards */}
      <div className="mt-10">
        <motion.div
          className="flex flex-wrap gap-4 justify-center px-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <StepCard
            number={1}
            title="Download Wabbajack"
            description={
              <>
                <p className="font-light">
                  Click the Download link above to download the official Launcher from GitHub.
                </p>
                <br />
                <p className="font-light">
                  Alternatively you can go the GitHub page directly and download Wabbajack.
                </p>
              </>
            }
          />
          <StepCard
            number={2}
            title="Pick a Modlist"
            description={
              <>
                <p className="font-light">
                  Pick a Modlist from the{' '}
                  <Link to="/gallery" className="hover:underline text-wabbajack-purple-light">
                    Gallery
                  </Link>{' '}
                  or the carousel below. Be sure to read the README before choosing a Modlist.
                </p>
                <p className="font-light">
                  You can also use the Archive Search feature to browse through the Archives that
                  will be downloaded.
                </p>
              </>
            }
          />
          <StepCard
            number={3}
            title="Install the Modlist"
            description={
              <>
                <p className="font-light">
                  Install the Modlist with Wabbajack. Each Modlist has its own set of quirks so make
                  sure to read the README before installation.
                </p>
                <p className="font-light">
                  Wabbajack is fully automated and only requires user interactions before and after
                  the installation.
                </p>
              </>
            }
          />
        </motion.div>

        {/* Compatibility Section */}
        <motion.div
          className="flex flex-col justify-center mt-5 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="font-subtitle mt-2 text-wabbajack-purple-light text-3xl">
            Compatibility:
          </h2>
          <div className="flex flex-wrap gap-4 justify-center px-3 mt-5">
            <CompatibilityCard
              icon={<WindowsIcon />}
              title="Windows"
              description={
                <>
                  Wabbajack requires an updated Home or Pro version of Windows installed to function.
                  <br />
                  Outdated installations, LTSC, IoT Enterprise and "debloated" versions of Windows are
                  not supported.
                </>
              }
            />
            <CompatibilityCard
              icon={<LinuxIcon />}
              title="Linux"
              description={
                <>
                  There are no official Linux builds available, however unofficial{' '}
                  <a
                    href={EXTERNAL_LINKS.linuxGuide}
                    className="hover:underline text-wabbajack-purple-light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    guides
                  </a>{' '}
                  exist and are talked about in the{' '}
                  <a
                    href={EXTERNAL_LINKS.linuxDiscordChannel}
                    className="hover:underline text-wabbajack-purple-light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    # unofficial-linux-help
                  </a>{' '}
                  channel on the Wabbajack discord.
                </>
              }
            />
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="mt-5">
        <ModlistCarousel />
      </div>
    </div>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: React.ReactNode;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <motion.div variants={fadeInUp} className="relative mb-5 pt-56 max-w-sm w-full">
      <Card className="absolute top-6 bottom-0 left-0 right-0 h-full w-full p-5">
        <CardContent className="p-0">
          <h3 className="mt-2 mb-3 text-xl text-center">{title}</h3>
          {description}
        </CardContent>
      </Card>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-wabbajack-background-darker rounded-full text-center w-10 h-10 flex items-center justify-center">
        <p className="text-2xl">{number}</p>
      </div>
    </motion.div>
  );
}

interface CompatibilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function CompatibilityCard({ icon, title, description }: CompatibilityCardProps) {
  return (
    <div className="relative mb-5 max-w-sm w-full">
      <Card className="h-full w-full p-5">
        <CardContent className="p-0">
          <h3 className="mt-2 mb-3 text-xl text-center font-semibold flex items-center justify-center gap-2">
            {icon}
            {title}
          </h3>
          <p className="font-light">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function WindowsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.35-.2.553.553 0 00.134-.335c.003-.2-.05-.335-.156-.468a1.45 1.45 0 00-.35-.4 2.21 2.21 0 00-.698-.533 7.83 7.83 0 00-.481-.198l-.02-.006c-.105-.065-.247-.135-.391-.2-.036-.06-.07-.153-.1-.2-.03-.118-.06-.2-.09-.4a1.713 1.713 0 00-.12-.533c-.04-.107-.08-.167-.12-.2-.292-.333-.792-.465-1.376-.4a3.8 3.8 0 01-.533-.067c-.173-.698-.063-1.267.201-1.802.148-.333.332-.645.479-.937l.024-.067c.402-.668.386-1.202.093-1.469-.046-.022-.058-.067-.106-.067a.253.253 0 00-.2.067c-.2.2-.253.468-.2.802.07.39.249.801.466 1.136.144.223.3.436.471.602a2.84 2.84 0 00-.134.47 3.797 3.797 0 00-.067.937c-.003.2.021.4.058.535.022.133.065.198.11.333l.024.024c-.058.135-.134.333-.178.6-.06.27-.067.535-.046.869a7.01 7.01 0 01-.046.8v.003c-.134.865-1.017 1.468-2.045 1.8-.572.134-1.083.601-1.515 1.203-.44.6-.743 1.335-.743 2.07 0 .267.058.534.158.8.298.602.897 1.203 2.095 1.47.399.067.797.134 1.196.2 1.197.2 2.463.4 3.413.669a4.04 4.04 0 011.204.6c.4.267.667.6.807.936v.003a2.9 2.9 0 01.157.803c.036.601-.04 1.27-.243 2.003-.4 1.47-1.232 3.143-2.574 4.815-.069.134-.138.2-.169.336-.1.2-.167.469-.1.669.1.267.365.467.765.4h.002a.982.982 0 00.467-.2c.2-.134.365-.334.498-.533.133-.2.233-.4.264-.601.033-.2.007-.4-.09-.535-.093-.135-.255-.2-.453-.267-.197-.067-.428-.067-.66-.067h-.066l.003-.003c.338-.47.609-.936.796-1.37.267-.602.398-1.135.431-1.603.04-.534-.023-1.002-.147-1.403l-.001-.003a2.42 2.42 0 00-.465-.8c-.2-.268-.467-.535-.8-.802a5.69 5.69 0 00-1.07-.669c-.133-.067-.27-.135-.4-.2a8.95 8.95 0 00-.334-.135c-.098-.04-.2-.067-.3-.2a1.63 1.63 0 01-.265-.535 2.27 2.27 0 01-.1-.936c.015-.2.067-.401.134-.601.066-.2.165-.4.264-.602.1-.2.198-.401.266-.601a1.74 1.74 0 00.134-.601c0-.2-.034-.4-.133-.601a1.44 1.44 0 00-.267-.4c-.1-.134-.232-.267-.398-.4a3.3 3.3 0 00-.465-.334c-.167-.133-.333-.267-.5-.4a3.097 3.097 0 01-.432-.4 1.38 1.38 0 01-.3-.468 1.414 1.414 0 01-.1-.534c0-.2.033-.4.1-.602.066-.2.165-.4.298-.6a4.1 4.1 0 01.431-.602c.166-.2.365-.4.565-.6.398-.4.863-.8 1.23-1.27.398-.467.73-.935.964-1.403.198-.4.331-.8.398-1.203.066-.4.066-.8 0-1.203a3.903 3.903 0 00-.3-.936c-.131-.267-.298-.535-.498-.8-.199-.268-.43-.535-.696-.803a14.02 14.02 0 00-.864-.8c-.3-.268-.598-.535-.864-.803a5.81 5.81 0 01-.697-.801 3.075 3.075 0 01-.464-.869 2.767 2.767 0 01-.166-.935c0-.334.066-.668.2-1.002.131-.334.33-.668.596-1.002.267-.334.6-.668 1-1.002.398-.334.863-.668 1.395-1.002a17.43 17.43 0 011.661-1.002c.565-.334 1.164-.668 1.795-1.003a32.2 32.2 0 011.894-1.002c.631-.335 1.263-.669 1.861-1.003.598-.334 1.163-.668 1.662-1.002.498-.334.93-.668 1.296-1.002.365-.334.664-.668.897-1.002.232-.334.398-.668.498-1.002.1-.334.133-.669.1-1.003a2.686 2.686 0 00-.232-.935 3.326 3.326 0 00-.531-.869 4.3 4.3 0 00-.797-.8 5.69 5.69 0 00-1.03-.67 7.378 7.378 0 00-1.196-.534 9.352 9.352 0 00-1.328-.4 11.51 11.51 0 00-1.428-.267 13.783 13.783 0 00-1.495-.133 16.118 16.118 0 00-1.53 0c-.5.033-.998.1-1.462.2-.466.1-.897.233-1.296.4-.4.166-.765.4-1.097.667-.332.268-.63.568-.897.936-.265.334-.497.735-.697 1.135a9.12 9.12 0 00-.497 1.203 11.04 11.04 0 00-.332 1.27c-.066.399-.1.799-.1 1.136 0 .334.034.667.1 1.002.067.334.167.668.3 1.002.133.334.3.668.498 1.002.2.334.432.668.698 1.002.265.334.565.668.897 1.002.332.334.697.668 1.096 1.002.4.334.83.668 1.296 1.002.464.334.963.668 1.495 1.002.53.334 1.096.668 1.694 1.002a50.63 50.63 0 011.861 1.002c.598.334 1.163.668 1.695 1.002.53.334 1.03.668 1.495 1.002.465.334.897.668 1.296 1.002.398.334.763.668 1.095 1.002.333.334.632.668.898 1.002.265.334.497.668.697 1.002.199.334.365.668.498 1.002.133.334.232.668.298 1.002.067.334.1.668.1 1.002 0 .334-.033.668-.1 1.002-.066.334-.165.668-.298 1.002a5.87 5.87 0 01-.498 1.002c-.2.334-.432.668-.697 1.002-.266.334-.565.668-.898 1.002a13.38 13.38 0 01-1.095 1.002c-.399.334-.83.668-1.296 1.002-.466.334-.964.668-1.495 1.002a34.59 34.59 0 01-1.695 1.002c-.598.334-1.23.668-1.86 1.002a48.35 48.35 0 01-1.862 1.003c-.598.334-1.163.668-1.694 1.002-.532.334-1.03.668-1.495 1.002-.466.334-.898.668-1.296 1.002-.4.334-.764.668-1.096 1.002a8.39 8.39 0 00-.898 1.002 5.87 5.87 0 00-.697 1.002 4.2 4.2 0 00-.498 1.003 3.154 3.154 0 00-.3 1.002c-.066.334-.1.668-.1 1.002s.034.668.1 1.002c.067.334.167.668.3 1.002.132.334.298.668.497 1.002.2.334.432.668.698 1.002.265.334.565.668.897 1.002.332.334.697.668 1.096 1.003.4.334.83.668 1.296 1.002.465.334.963.668 1.495 1.002.53.334 1.096.668 1.694 1.002.598.334 1.23.668 1.861 1.002.632.334 1.263.668 1.862 1.003.598.334 1.163.668 1.694 1.002.532.334 1.03.668 1.495 1.002.466.334.898.668 1.296 1.002.4.334.764.668 1.096 1.002.332.334.631.668.897 1.002.266.334.498.668.698 1.002.199.334.365.668.497 1.002.133.334.232.668.299 1.002.066.334.1.668.1 1.002 0 .334-.034.668-.1 1.002-.067.334-.166.668-.299 1.003-.132.334-.298.668-.497 1.002-.2.334-.432.668-.698 1.002-.266.334-.565.668-.897 1.002-.332.334-.697.668-1.096 1.002-.398.334-.83.668-1.296 1.002-.465.334-.963.668-1.495 1.002-.531.334-1.096.668-1.694 1.002a49.87 49.87 0 01-1.862 1.003c-.598.334-1.163.668-1.694 1.002-.532.334-1.03.668-1.495 1.002a18.32 18.32 0 00-1.296 1.002c-.4.334-.764.668-1.096 1.002-.332.334-.632.668-.897 1.002-.266.334-.498.668-.698 1.002-.2.334-.365.668-.498 1.003a3.867 3.867 0 00-.298 1.002c-.067.334-.1.668-.1 1.002 0 .334.033.668.1 1.002.066.334.165.668.298 1.002.133.334.299.668.498 1.002.2.334.432.668.698 1.003.266.334.565.668.897 1.002.332.334.697.668 1.096 1.002.398.334.83.668 1.296 1.002.465.334.963.668 1.495 1.002.531.334 1.096.668 1.694 1.002a50.68 50.68 0 001.862 1.003c.63.334 1.263.668 1.861 1.002.598.334 1.163.668 1.694 1.002.532.334 1.03.668 1.496 1.002.465.334.897.668 1.296 1.002.398.334.763.668 1.095 1.002.333.334.632.668.898 1.002.265.334.497.668.697 1.003.2.334.365.668.498 1.002.133.334.232.668.298 1.002.067.334.1.668.1 1.002z" />
    </svg>
  );
}
