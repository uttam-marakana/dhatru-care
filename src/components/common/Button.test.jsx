import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

// Mock onClick
const mockOnClick = vi.fn()

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click event', async () => {
    render(<Button onClick={mockOnClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Test</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="primary">Primary</Button>)
    expect(container.firstChild).toHaveClass('btn-primary')
  })
})

