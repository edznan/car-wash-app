import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { Step } from 'src/app/shared/models/step';

@Component({
  selector: 'app-wash',
  templateUrl: './wash.component.html',
  styleUrls: ['./wash.component.scss']
})
export class WashComponent implements OnInit {

  @Output() newWash = new EventEmitter<boolean>();

  @Input() duration = 0;
  @Input() program: Program = {
    label: '',
    description: '',
    steps: []
  };

  currentStep: Step = {
    label: '',
    description: '',
    length: 0
  };

  remainingTime: number = 0;
  progress = 0;

  isWashing = true;

  constructor() { }

  ngOnInit(): void {
    this.remainingTime = this.duration;
    if (this.program.label && this.program.description && this.program.steps) {
      this.prepareWashing(this.program, this.duration);
    }
  }

  prepareWashing(program: Program, duration: number) {

    let durationPerStep = duration / program.steps.length;
    let numberOfSteps = duration / durationPerStep;

    program.steps.forEach(step => {
      step.length = durationPerStep;
    });

    this.currentStep = program.steps[0];

    const countdown = () => {
      if (this.remainingTime == -1) {
        clearTimeout(timer);
        this.endTimer()
      } else {
        this.remainingTime--;
        durationPerStep--;
        if (durationPerStep === 0) {
          numberOfSteps--;
          durationPerStep = duration / program.steps.length
          this.currentStep = program.steps[program.steps.length - numberOfSteps];
        } else {
          this.currentStep.length = this.currentStep.length! - 1;
          this.currentStep.length = Math.round(this.currentStep.length);
        }

        this.progress = (100 * this.remainingTime) / this.duration;
      }
    }
    const timer = setInterval(countdown, 1000);
  }

  animateStep(step: Step) {
    this.currentStep = step;
  }

  endTimer() {
    this.currentStep = {
      label: '--',
      description: '--',
      length: 0
    }
    this.isWashing = false;
  }

  restart() {
    this.newWash.emit(true);
  }
}
