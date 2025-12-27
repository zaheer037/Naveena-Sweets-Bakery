import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Cart Context
const CartContext = createContext()

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
}

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { item, quantity = 1, weight = 'standard' } = action.payload
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.id === item.id && 
                   cartItem.category === item.category && 
                   cartItem.weight === weight
      )

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += quantity
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (item.price * quantity)
        }
      } else {
        // New item, add to cart
        const newItem = {
          id: item.id,
          title: item.title,
          desc: item.desc,
          price: item.price,
          img: item.img,
          category: item.category || 'general',
          quantity,
          weight
        }
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (item.price * quantity)
        }
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id, category, weight } = action.payload
      const itemToRemove = state.items.find(
        item => item.id === id && item.category === category && item.weight === weight
      )
      
      if (!itemToRemove) return state

      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === id && item.category === category && item.weight === weight)
        ),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, category, weight, quantity } = action.payload
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.category === category && item.weight === weight
      )
      
      if (itemIndex === -1) return state

      const item = state.items[itemIndex]
      const quantityDiff = quantity - item.quantity
      const priceDiff = item.price * quantityDiff

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter((_, index) => index !== itemIndex),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (item.price * item.quantity)
        }
      }

      const updatedItems = [...state.items]
      updatedItems[itemIndex] = { ...item, quantity }

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + priceDiff
      }
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }

    case CART_ACTIONS.LOAD_CART:
      return action.payload

    default:
      return state
  }
}

// Initial cart state
const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('naveena-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('naveena-cart', JSON.stringify(cart))
  }, [cart])

  // Cart actions
  const addToCart = (item, quantity = 1, weight = 'standard') => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { item, quantity, weight }
    })
  }

  const removeFromCart = (id, category, weight = 'standard') => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id, category, weight }
    })
  }

  const updateQuantity = (id, category, weight, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, category, weight, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const getItemQuantity = (id, category, weight = 'standard') => {
    const item = cart.items.find(
      item => item.id === id && item.category === category && item.weight === weight
    )
    return item ? item.quantity : 0
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
