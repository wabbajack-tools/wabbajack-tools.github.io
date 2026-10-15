import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@/components/common/Icon';
import { getGameDisplayName } from '@/types/game';
import type { ModlistMetadata } from '@/types';

const pill = 'inline-flex h-[26px] items-center rounded-[4px] px-2';

export function ModlistHero({ modlist }: { modlist: ModlistMetadata }) {
  const image = modlist.links.image;
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const showImage = !!image && failedImage !== image;

  return (
    <div className="relative h-[clamp(260px,38vw,520px)] overflow-hidden bg-tile">
      {showImage ? (
        <img
          src={image}
          alt={`Image of the Modlist ${modlist.title}`}
          className="absolute inset-0 size-full object-cover"
          loading="eager"
          onError={() => setFailedImage(image)}
        />
      ) : (
        <div className="no-image absolute inset-0" />
      )}
      <div className="absolute -right-[10%] -bottom-[40%] -left-[10%] h-[90%] bg-ground opacity-95 blur-[60px]" />

      <div className="absolute inset-0 mx-auto flex max-w-[1280px] flex-col justify-between px-[clamp(16px,4vw,40px)] py-5">
        <div>
          <Link
            to="/gallery"
            className="inline-flex h-8 items-center gap-1 rounded-[4px] bg-ground/80 pr-3 pl-2 text-fg hover:bg-hover hover:text-primary"
          >
            <Icon name="chevron_right" flip className="size-4" />
            Back to gallery
          </Link>
        </div>
        <div>
          <div className="mb-3 flex flex-wrap gap-1">
            <span className={`${pill} bg-ground/66`}>{getGameDisplayName(modlist.game)}</span>
            {modlist.nsfw && <span className={`${pill} bg-nsfw shadow-[0_0_30px_4px_#a70000ab]`}>NSFW</span>}
            {modlist.force_down && (
              <span className={`${pill} bg-unavailable shadow-[0_0_30px_4px_#b17405ab]`}>Unavailable</span>
            )}
          </div>
          <h1 className="m-0 text-[clamp(36px,6.5vw,80px)] leading-[1.1] font-bold text-balance">{modlist.title}</h1>
          <div className="mt-1.5 text-[18px] leading-[1.23]">
            <span className="text-fg-66">by </span>
            {modlist.author}
          </div>
        </div>
      </div>
    </div>
  );
}
