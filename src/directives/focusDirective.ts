import type { Directive } from 'vue'

const focusDirective: Directive ={
  mounted(el, binding) {
    if (binding.value === 'initial') {
      el.focus()
    }

    el.addEventListener('input', (event: Event) => {
      const input = event.target as HTMLInputElement
      const value = input.value

      // input should be numeric only
      // each input should be 1 numeric only
      if (!(/^\d$/.test(value))) {
        input.value = ''
        return
      }

      if (value.length > 0) {
        const nextInput = getNextInput(input)
        if (nextInput) {
          nextInput.focus()
        }
      }
    })

    let backspaceCount = 0;
    el.addEventListener('keydown', (event: KeyboardEvent) => {
      // should focus on previous input when user press backspace
      if (event.key === 'Backspace') {
        const currentInput = event.target as HTMLInputElement;
    
        if (!currentInput.previousElementSibling && currentInput.value) {
          currentInput.value = '';
        } else if (!currentInput.value && backspaceCount > 0) {
          const prevInput = getPrevInput(currentInput);
          if (prevInput) {
            prevInput.focus();
          }
          backspaceCount = 0;
        } else {
          backspaceCount++;
        }
      } else {
        backspaceCount = 0;
      }

      // add arrowleft、arrowright adjustment
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const currentInput = event.target as HTMLInputElement
        const direction = event.key === 'ArrowLeft' ? 'prev' : 'next'
        const nextInput = direction === 'next' ? getNextInput(currentInput) : getPrevInput(currentInput)
        if (nextInput) {
          nextInput.focus()
        }
      }
    })

    // able to paste code from clipboard
    el.addEventListener('paste', (event: ClipboardEvent) => {
      event.preventDefault()
      const clipboardData = event.clipboardData
      if (clipboardData) {
        console.log(clipboardData.getData('text'))
        const pastedText = clipboardData.getData('text')
        const inputs = el.parentElement?.querySelectorAll('input')
        if (inputs) {
          for (let i = 0; i < 4; i++) {
            if (inputs[i] instanceof HTMLInputElement) {
              inputs[i].value = pastedText[i]
            }
          }
        }
      }
    })

  }
}

function getNextInput(currentInput: HTMLInputElement): HTMLInputElement | null {
  let next = currentInput.nextElementSibling

  while (next) {
    if (next instanceof HTMLInputElement) {
      return next
    }
    next = next.nextElementSibling;
  }
  return null
}

function getPrevInput(currentInput: HTMLInputElement): HTMLInputElement | null {
  let prev = currentInput.previousElementSibling
  while (prev) {
    if (prev instanceof HTMLInputElement) {
      return prev
    }
    prev = prev.previousElementSibling
  }
  return null
}


export default focusDirective;