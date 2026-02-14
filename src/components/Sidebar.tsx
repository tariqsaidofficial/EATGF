
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Book, Shield, Cloud, Terminal } from 'lucide-react';

export interface SidebarItemDef {
  id: string;
  label: string;
  items?: SidebarItemDef[];
}

export interface SidebarSection {
  category: string;
  icon: any;
  items: SidebarItemDef[];
}

interface SidebarProps {
  activeDoc: string;
  onSelectDoc: (id: string) => void;
}

export const SIDEBAR_ITEMS: SidebarSection[] = [
  {
    category: 'Getting Started',
    icon: Book,
    items: [
      { id: 'intro', label: 'Introduction' },
      { 
        id: 'install', 
        label: 'Installation',
        items: [
          { id: 'install-cli', label: 'CLI Setup' },
          { id: 'install-docker', label: 'Docker Container' },
          { id: 'install-k8s', label: 'Kubernetes Helm' },
        ]
      },
      { id: 'quickstart', label: 'Quick Start' },
    ]
  },
  {
    category: 'Core Concepts',
    icon: Cloud,
    items: [
      { id: 'architecture', label: 'Architecture' },
      { id: 'data-model', label: 'Data Model' },
      { id: 'authentication', label: 'Authentication' },
    ]
  },
  {
    category: 'Platform Security',
    icon: Shield,
    items: [
      { id: 'compliance', label: 'Compliance & SOC2' },
      { 
        id: 'encryption', 
        label: 'Encryption',
        items: [
            { id: 'enc-at-rest', label: 'At Rest' },
            { id: 'enc-transit', label: 'In Transit' },
            { id: 'enc-keys', label: 'Key Management' },
        ]
      },
      { id: 'sso', label: 'SSO Configuration' },
    ]
  },
  {
    category: 'API Reference',
    icon: Terminal,
    items: [
      { id: 'api-overview', label: 'Overview' },
      { id: 'rate-limits', label: 'Rate Limits' },
      { id: 'errors', label: 'Error Handling' },
    ]
  }
];

interface SidebarItemProps { 
  item: SidebarItemDef;
  activeDoc: string;
  onSelectDoc: (id: string) => void;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  activeDoc, 
  onSelectDoc, 
  depth = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasChildren = item.items && item.items.length > 0;
  
  // Logic to determine if this item (or its children) is active
  const isActiveDirectly = activeDoc === item.id;
  
  useEffect(() => {
    if (hasChildren) {
      const hasActiveChild = (items: SidebarItemDef[]): boolean => {
         return items.some(i => i.id === activeDoc || (i.items && hasActiveChild(i.items)));
      };
      if (hasActiveChild(item.items!)) {
        setIsExpanded(true);
      }
    }
  }, [activeDoc, item.items, hasChildren]);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onSelectDoc(item.id);
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: `0.5rem 0.75rem 0.5rem ${0.75 + (depth * 1.2)}rem`,
          background: isActiveDirectly ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
          color: isActiveDirectly ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)',
          border: 'none',
          borderLeft: isActiveDirectly ? `3px solid var(--nexus-primary)` : `3px solid transparent`,
          borderRadius: '0 4px 4px 0',
          fontSize: '0.9rem',
          fontWeight: isActiveDirectly ? 600 : 400,
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onMouseEnter={(e) => {
            if (!isActiveDirectly) e.currentTarget.style.color = 'var(--nexus-primary)';
        }}
        onMouseLeave={(e) => {
            if (!isActiveDirectly) e.currentTarget.style.color = 'var(--nexus-text-secondary)';
        }}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <span style={{ color: 'var(--nexus-text-secondary)', display: 'flex' }}>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
      </button>
      
      {hasChildren && isExpanded && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {item.items!.map(child => (
            <SidebarItem 
              key={child.id} 
              item={child} 
              activeDoc={activeDoc} 
              onSelectDoc={onSelectDoc} 
              depth={depth + 1} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeDoc, onSelectDoc }) => {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: 'calc(100vh - var(--navbar-height))',
      position: 'sticky',
      top: 'var(--navbar-height)',
      borderRight: '1px solid var(--nexus-border)',
      overflowY: 'auto',
      padding: '1.5rem 0',
      background: 'var(--nexus-bg-root)',
      flexShrink: 0
    }}>
      <div style={{ padding: '0 1rem' }}>
        {SIDEBAR_ITEMS.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--nexus-text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              paddingLeft: '0.5rem'
            }}>
              {section.category}
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {section.items.map(item => (
                <SidebarItem 
                  key={item.id} 
                  item={item} 
                  activeDoc={activeDoc} 
                  onSelectDoc={onSelectDoc} 
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
