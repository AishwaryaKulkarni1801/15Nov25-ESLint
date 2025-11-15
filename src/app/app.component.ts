import { Component } from '@angular/core';

// Multiple unused imports (ESLint errors)
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Demo App';
  
  // Unused variable (ESLint error)
  private unusedProperty: string = 'not used anywhere';
  
  // Variable declared with 'var' instead of 'let/const' (ESLint error)
  someMethod() {
    const oldStyleVar = 'should use let or const';
    console.log('Method called');
  }

  getAngularVersion(): string {
    return '16.x';
  }
}
