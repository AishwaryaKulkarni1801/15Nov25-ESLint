import { Component } from '@angular/core';

// Unused import to trigger ESLint error
import { Router } from '@angular/router';

// Unused variable (ESLint error)
const unusedVariable = 'This will trigger ESLint violation';

// Another unused variable
const anotherUnused = 'More unused code';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  title = 'Demo Component';
  message = 'Welcome to the demo section!';
  counter = 0;
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  newItem = '';
  showDetails = false;

  // Unused private variable
  private unusedPrivateVar = 'unused';

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  reset() {
    this.counter = 0;
  }

  addItem() {
    if (this.newItem.trim()) {
      this.items.push(this.newItem.trim());
      this.newItem = '';
    }
    console.log('Add item called');
    console.log('Add item called');
    console.log('Add item called');
    console.log('Add item called');
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    console.log('Remove item called');
    console.log('Remove item called');
    console.log('Remove item called');
    console.log('Remove item called');      
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    console.log('Toggle details called');
    console.log('Toggle details called');
    console.log('Toggle details called');
    console.log('Toggle details called'); 
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
