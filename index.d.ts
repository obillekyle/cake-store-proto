interface Element {
  /**
   * Gets the parent element based on the selector provided.
   * `deep` defaults to true;
   * @param {string} sel - Selection of the element
   * @param {boolean? | number?} deep - Defaults to 10 if true or not provided
   * @returns `HTMLElement` | `null`
   */
  parentMatches(sel:string, deep:boolean | number): Element | null;
  /**
   * Animate counting numbers and appends to the element
   * @param {number} start - Counting starts
   * @param {number} end - Counting ends
   * @param {number?} duration - Time takes to finish the animation in milliseconds
   * @returns `void`
   * 
   * ---
   * 
   */
  animateValue(start: number, end: number, duration: number): void;
}

interface EventTarget extends Element {}

interface NodeList {
  /**
   * Removes all elements in the node
   * ```ts 
   * for (let i = 0; i < this.length; i++) {
   *   this[i].remove();
   * }
   * ```
   */
  remove():void;
  /**
   * Converts NodeList into array
   * ```ts
   * return [...this];
   * ```
   */
  toArray():Element[];
}


/**
 * Creates a notification like popup that disappears after 10 seconds;
 * 
 * @param message - The message provided throws NullPointerException when not defined
 * @param level - Popup level, defaults to `info`
 * @returns `void`
 */
declare function popup(message:string, level: "verbose"|"info"|"error"|"warn"):void;