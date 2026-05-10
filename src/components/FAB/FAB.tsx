interface FABProps {
  onClick: () => void
}

export default function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #A259FF 0%, #FF6B9D 100%)',
        boxShadow: '0 0 24px rgba(162,89,255,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        fontSize: 28,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      +
    </button>
  )
}
