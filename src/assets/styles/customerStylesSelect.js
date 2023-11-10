export const customerStylesSelect = hasError => ({
  control: (styles, { isFocused }) => ({
    ...styles,
    borderRadius: '13px',
    height: '4.6rem',
    boxSizing: 'border-box',
    fontSize: '1.6rem',
    boxShadow: isFocused ? '0px 0px 0px 2px rgba(129, 172, 229, 0.3)' : 'none',
    border: isFocused ? '1px solid #81ACE5' : hasError ? '1px solid #ad0000' : '1px solid #d9d9d9',
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? '#EAEAEA' : '',
      background: isSelected ? '#C0D5F2' : '',
      cursor: 'pointer',
      textAlign: 'center',
      height: '28px',
      lineHeight: '2.2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '-36px',
      margin: '0 auto',
      fontSize: '1.6rem',
    }
  },
  menu: styles => {
    return {
      ...styles,
      maxWidth: '120px',
      borderRadius: '2rem',
      overflow: 'hidden',
    }
  },
})
