import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableLineChartComponent } from './draggable-line-chart.component';

describe('DraggableLineChartComponent', () => {
  let component: DraggableLineChartComponent;
  let fixture: ComponentFixture<DraggableLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableLineChartComponent]
    });
    fixture = TestBed.createComponent(DraggableLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
