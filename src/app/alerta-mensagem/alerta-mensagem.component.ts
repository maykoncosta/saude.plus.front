import { Component, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alerta-mensagem',
  templateUrl: './alerta-mensagem.component.html',
  styleUrls: ['./alerta-mensagem.component.scss'],
})
export class AlertaMensagemComponent {
  constructor(private toastController: ToastController) {}

  @Input() mensagem!: string;
  @Input() tipo!: 'sucesso' | 'erro';

  async exibirToast() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000,
      color: this.tipo === 'sucesso' ? 'success' : 'danger'
    });
    toast.present();
  }
}
