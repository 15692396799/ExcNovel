import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSignInAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface StatusCardProps {
  icon?: IconDefinition | string;
  title: string;
  message: string;
  children?: React.ReactNode;
}

const iconMap = {
  'check-circle': faCheckCircle,
  'sign-in-alt': faSignInAlt,
  'exclamation-triangle': faExclamationTriangle
};

const StatusCard: React.FC<StatusCardProps> = ({ 
  icon = 'check-circle', 
  title, 
  message, 
  children 
}) => {
  const resolvedIcon = typeof icon === 'string' 
    ? iconMap[icon as keyof typeof iconMap] 
    : icon;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body text-center p-4">
        {resolvedIcon && (
          <FontAwesomeIcon 
            icon={resolvedIcon} 
            size="3x" 
            className={`text-${icon === 'exclamation-triangle' ? 'warning' : 'success'} mb-3`}
          />
        )}
        <h3 className="card-title mb-2">{title}</h3>
        <p className="card-text text-muted mb-4">{message}</p>
        {children}
      </div>
    </div>
  );
};

export default StatusCard;