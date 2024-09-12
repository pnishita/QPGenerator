import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../model/question.model';
import { QuestionService } from '../../service/question.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-list',
  standalone: true,
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  subjectId: number | null = null;
  questionForm: FormGroup;
  jsonInput: string = '';  // For JSON input
  showAddQuestion = false;
  showAddJson = false;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required],
      correctAnswer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.subjectId = +params.get('subjectId')!;
      if (this.subjectId) {
        this.loadQuestions();
      }
    });
  }

  loadQuestions(): void {
    if (this.subjectId) {
      this.questionService.getQuestionsBySubject(this.subjectId).subscribe(
        (data: Question[]) => {
          this.questions = data;
        },
        (error: any) => {
          console.error('Error fetching questions:', error); 
        }
      );
    }
  }

  toggleAddQuestion(): void {
    this.showAddQuestion = !this.showAddQuestion;
  }

  toggleAddJson(): void {
    this.showAddJson = !this.showAddJson;
  }

  addQuestion(): void {
    if (this.subjectId) {
      const newQuestion: Question = {
        id: 0,
        questionText: this.questionForm.value.questionText,
        optionA: this.questionForm.value.optionA,
        optionB: this.questionForm.value.optionB,
        optionC: this.questionForm.value.optionC,
        optionD: this.questionForm.value.optionD,
        correctAnswer: this.questionForm.value.correctAnswer,
        subject: { subjectId: this.subjectId, name: '' }
      };

      this.questionService.addQuestion(newQuestion).subscribe(
        () => {
          this.loadQuestions();
          this.questionForm.reset();
          this.toggleAddQuestion();
          alert('Question added successfully!');
        }
      );
    }
  }

  addJson(): void {
  
      const questions: Question[] = JSON.parse(this.jsonInput);
      questions.forEach(q => q.subject = { subjectId: this.subjectId!, name: '' });

      this.questionService.addAllQuestion(questions).subscribe(
        () => {
          this.loadQuestions();
          this.jsonInput = '';
          this.toggleAddJson();
          alert('Questions added successfully!');}
        // },
        // (error: any) => {
        //   console.error('Error adding questions:', error);
        //   alert('Error adding questions. Please check the JSON format.');
        // }
      );
    // } catch (error) {
    //   console.error('Invalid JSON format:', error);
    //   alert('Invalid JSON format. Please correct it and try again.');
    // }
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(
      () => {
        this.loadQuestions();
        alert('Question deleted successfully!');
      },
      (error: any) => {
        console.error('Error deleting question:', error);
        alert('Error deleting question. Please try again.');
      }
    );
  }
}
