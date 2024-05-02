import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioDetalhadoPage } from './relatorio-detalhado.page';

describe('RelatorioDetalhadoPage', () => {
  let component: RelatorioDetalhadoPage;
  let fixture: ComponentFixture<RelatorioDetalhadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RelatorioDetalhadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
