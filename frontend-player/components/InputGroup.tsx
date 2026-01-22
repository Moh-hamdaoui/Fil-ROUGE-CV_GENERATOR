'use client'

import React from 'react'

interface InputGroupProps {
  label: React.ReactNode
  error?: string
  children: React.ReactNode
  className?: string
}

export function InputGroup({ label, error, children, className = '' }: InputGroupProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
      {error && <span className="text-red-400 text-xs block">{error}</span>}
    </div>
  )
}