import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { FileArchive, User, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { isNexusArchive } from '@/types/search';
import type { GlobalArchiveResult } from '@/types/search';

interface ArchiveResultCardProps {
  result: GlobalArchiveResult;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const MAX_VISIBLE_BADGES = 4;

export function ArchiveResultCard({ result }: ArchiveResultCardProps) {
  const { archive, modlists } = result;
  const state = archive.State;
  const isNexus = isNexusArchive(state);
  const [imageError, setImageError] = useState(false);

  const displayName = state?.Name || archive.Name;
  const author = isNexus ? state.Author : undefined;
  const description = isNexus ? state.Description : undefined;
  const imageUrl = isNexus ? state.ImageURL : undefined;
  const hasImage = imageUrl && !imageError;

  const visibleModlists = modlists.slice(0, MAX_VISIBLE_BADGES);
  const hiddenCount = modlists.length - MAX_VISIBLE_BADGES;

  return (
    <div className="group rounded-xl bg-surface/60 backdrop-blur-sm border border-neon-purple/10 p-4 transition-all duration-300 hover:border-neon-purple/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
      <div className="flex items-start gap-4">
        {/* Thumbnail or Icon */}
        {hasImage ? (
          <div className="flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border border-neon-purple/20 bg-void/50">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
            <FileArchive className="h-6 w-6 text-neon-purple" />
          </div>
        )}

        {/* Content */}
        <div className="flex-grow min-w-0">
          {/* Archive name */}
          <h3 className="font-semibold text-text-primary truncate group-hover:text-neon-purple transition-colors">
            {archive.Name}
          </h3>

          {/* Nexus name if different */}
          {displayName && displayName !== archive.Name && (
            <p className="text-sm text-text-secondary truncate mt-0.5">
              {displayName}
            </p>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-text-muted">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-text-secondary mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Modlist badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {visibleModlists.map((modlist) => (
              <Link
                key={`${modlist.repo}-${modlist.machineURL}`}
                to="/modlist/$repo/$id"
                params={{ repo: modlist.repo, id: modlist.machineURL }}
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-neon-purple/20 hover:text-neon-purple hover:border-neon-purple/30 transition-colors cursor-pointer"
                >
                  {modlist.name}
                </Badge>
              </Link>
            ))}
            {hiddenCount > 0 && (
              <Badge variant="outline" className="text-xs">
                +{hiddenCount} more
              </Badge>
            )}
          </div>
        </div>

        {/* Size */}
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <HardDrive className="h-3 w-3" />
            <span>{formatSize(archive.Size)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
