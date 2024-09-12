import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../model/question.model';
import { GeneratorService } from '../../service/generator.service';
import { Subject } from '../../model/subject.model';
import { SubjectService } from '../../service/subject.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  questions: Question[] = [];
  questionForm: FormGroup;
  pdfLoading = false;
  subjects: Subject[] = [];

  constructor(
    private generatorService: GeneratorService,
    private fb: FormBuilder,
    private subjectService: SubjectService
  ) {
    this.questionForm = this.fb.group({
      numberOfQuestions: [1, [Validators.required, Validators.min(1)]],
      subjectID: [null, Validators.required],
      questionText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data: Subject[]) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects', error);
      }
    );
  }

  getQuestions(): void {
    const { numberOfQuestions, subjectID } = this.questionForm.value;
    if (subjectID) {
      this.generatorService.getQuestions(numberOfQuestions, subjectID).subscribe(
        (data: Question[]) => {
          this.questions = data;
          console.log('Questions retrieved:', this.questions);
        },
        (error) => {
          console.error('Error fetching questions:', error);
        }
      );
    } else {
      alert('Subject ID is required.');
      console.error('Subject ID is required.');
    }
  }

  generateQuestionsPdf(): void {
    const { numberOfQuestions, subjectID } = this.questionForm.value;
    if (subjectID) {
      this.pdfLoading = true;
      this.generatorService.getQuestionsPdf(numberOfQuestions, subjectID).subscribe(
        (data: Blob) => {
          saveAs(data, `questions_${subjectID}.pdf`);
          this.pdfLoading = false;
        },
        (error) => {
          console.error('Error generating PDF:', error);
          this.pdfLoading = false;
        }
      );
    } else {
      alert('Subject ID is required.');
      console.error('Subject ID is required.');
    }
  }


}
