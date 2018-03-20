import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cad-delay-message',
  templateUrl: './delay-message.component.html'
})
export class DelayMessageComponent implements OnInit {

  @Input() mensagem: string
  @Input() ativo: boolean
  
  constructor() { }

  ngOnInit() {
  }

}
