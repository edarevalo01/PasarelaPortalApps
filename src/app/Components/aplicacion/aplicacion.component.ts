import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-aplicacion",
  templateUrl: "./aplicacion.component.html",
  styleUrls: ["./aplicacion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AplicacionComponent implements OnInit {
  public title = "PasarelaPortalApps";
  public parametrosUrl: any;
  public parametroValido: boolean = false;
  public urlValida: boolean = false;
  public url = "https://www.lasalle.edu.co/";
  public nombreAplicacion = "";
  public validarCookie: boolean = true;

  constructor(private route: ActivatedRoute, private cookie: CookieService) {
    this.getParametro();
    if (this.urlValida) {
      if (this.validarCookie) {
        this.getCookie();
      } else {
        this.parametroValido = true;
      }
    }
  }

  ngOnInit(): void {}

  getCookie() {
    let cookiePortal = this.cookie.get("UEPMDRPLS");
    if (cookiePortal) {
      localStorage.setItem("wDyXKWQYpd", cookiePortal);
      this.parametroValido = true;
    } else {
      this.parametroValido = false;
    }
  }

  validacion(e) {
    if (this.urlValida) {
      if (this.validarCookie) {
        let cookiePortal = this.cookie.get("UEPMDRPLS");
        let cookieSession = localStorage.getItem("wDyXKWQYpd");
        if (!cookiePortal) {
          this.url = "";
          this.nombreAplicacion = "";
          this.parametroValido = false;
        } else if (cookiePortal !== cookieSession) {
          localStorage.setItem("wDyXKWQYpd", cookiePortal);
          location.reload();
        } else {
          this.getParametro();
        }
      }
    }
  }

  getParametro() {
    this.parametrosUrl = this.route.snapshot.queryParams;
    if (this.parametrosUrl.token) {
      this.urlValida = true;
      var textDecrypt = CryptoJS.AES.decrypt(
        decodeURIComponent(this.parametrosUrl.token),
        "Lxj8tb6N2zuf"
      ).toString(CryptoJS.enc.Utf8);
      var params = textDecrypt.split(";");
      this.url = params[0];
      this.nombreAplicacion = params[1];
      this.validarCookie = params[2] == "S" ? true : false;
    } else {
      this.urlValida = false;
      this.url = "";
      this.nombreAplicacion = "";
      this.validarCookie = true;
    }
  }

  salirPasarela() {
    window.close();
  }

  changeUrl() {
    let urls = [
      "https://www.lasalle.edu.co/inscripciones2/html/login.html;SIA;N",
    ];

    let salidaUrls = "";

    urls.forEach((u) => {
      var x = CryptoJS.AES.encrypt(u, "Lxj8tb6N2zuf").toString();
      salidaUrls = salidaUrls + encodeURIComponent(x) + "\n";
      // console.log(encodeURIComponent(x));
      // console.log();
    });
    console.log(salidaUrls);
  }
}
