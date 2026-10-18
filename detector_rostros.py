"""
INSTITUTO NACIONAL "GENERAL FRANCISCO MENÉNDEZ" (INFRAMEN)
Especialidad: Desarrollo de Software | Sección: 1-2
Materia: Periodo IV - Introducción a Python
Clase III: Reconocimiento de rostro con Dlib y OpenCV
Prof. Ricardo Ernesto Melara
"""

import os
import time
import cv2

# Verificación e importación de detector
HAVE_DLIB = False
try:
    import dlib
    detector = dlib.get_frontal_face_detector()
    HAVE_DLIB = True
    print("[INFO] Motor de deteccion: Dlib Frontal Face Detector cargado.")
except ImportError:
    print("[ADVERTENCIA] Dlib no detectado en el entorno local.")
    print("[INFO] Activando motor de respaldo OpenCV Haar Cascade para ejecucion inmediata.")
    cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)

# Directorio de salida
DIRECTORIO_SALIDA = "rostros_dlib"
if not os.path.exists(DIRECTORIO_SALIDA):
    os.makedirs(DIRECTORIO_SALIDA)
    print(f"[SISTEMA] Directorio creado: {DIRECTORIO_SALIDA}")

# Inicialización de la cámara
cam = cv2.VideoCapture(0)
if not cam.isOpened():
    print("[ERROR] No se pudo inicializar la camara web.")
    exit(1)

# Parámetros operativos
contador = 0
limite_fotos = 10
ultimo_guardado = time.time()
intervalo_segundos = 2.0
padding = 60
mostrar_notificacion_hasta = 0

# Paleta Institucional INFRAMEN (Formato BGR de OpenCV)
COLOR_ROJO = (28, 28, 215)      # Rojo Institucional INFRAMEN (#D71C1C)
COLOR_NEGRO = (18, 18, 18)      # Negro Fondo (#121212)
COLOR_BLANCO = (245, 245, 245)  # Texto de Contraste
COLOR_GRIS = (70, 70, 70)       # Bordes secundarios

print("=======================================================")
print(" INFRAMEN - SECCION 1-2 DESARROLLO DE SOFTWARE")
print(" SISTEMA DE CAPTURA Y DETECCION FACIAL EN TIEMPO REAL")
print(" Presione 'q' para salir o espere a capturar 10 rostros.")
print("=======================================================")

while True:
    ret, frame = cam.read()
    if not ret:
        continue

    # Voltear horizontalmente para efecto espejo natural
    frame = cv2.flip(frame, 1)
    alto, ancho, _ = frame.shape

    # Conversión a escala de grises
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Lista de coordenadas [x1, y1, x2, y2]
    cajas_rostros = []

    if HAVE_DLIB:
        rostros = detector(gray)
        for rostro in rostros:
            x1 = max(rostro.left() - padding, 0)
            y1 = max(rostro.top() - padding, 0)
            x2 = min(rostro.right() + padding, ancho)
            y2 = min(rostro.bottom() + padding, alto)
            cajas_rostros.append((x1, y1, x2, y2))
    else:
        rostros_cv = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(60, 60))
        for (x, y, w, h) in rostros_cv:
            x1 = max(x - padding, 0)
            y1 = max(y - padding, 0)
            x2 = min(x + w + padding, ancho)
            y2 = min(y + h + padding, alto)
            cajas_rostros.append((x1, y1, x2, y2))

    tiempo_actual = time.time()

    for (x1, y1, x2, y2) in cajas_rostros:
        # Dibujar recuadro con estilo institucional (Rojo INFRAMEN con contorno)
        cv2.rectangle(frame, (x1 - 1, y1 - 1), (x2 + 1, y2 + 1), COLOR_NEGRO, 3)
        cv2.rectangle(frame, (x1, y1), (x2, y2), COLOR_ROJO, 2)

        # Esquinas decorativas de alta precisión
        largo_esquina = 18
        cv2.line(frame, (x1, y1), (x1 + largo_esquina, y1), COLOR_BLANCO, 2)
        cv2.line(frame, (x1, y1), (x1, y1 + largo_esquina), COLOR_BLANCO, 2)
        cv2.line(frame, (x2, y1), (x2 - largo_esquina, y1), COLOR_BLANCO, 2)
        cv2.line(frame, (x2, y1), (x2, y1 + largo_esquina), COLOR_BLANCO, 2)
        cv2.line(frame, (x1, y2), (x1 + largo_esquina, y2), COLOR_BLANCO, 2)
        cv2.line(frame, (x1, y2), (x1 - largo_esquina, y2), COLOR_BLANCO, 2)
        cv2.line(frame, (x2, y2), (x2 - largo_esquina, y2), COLOR_BLANCO, 2)
        cv2.line(frame, (x2, y2), (x2, y2 - largo_esquina), COLOR_BLANCO, 2)

        # Verificación de temporizador para captura
        if tiempo_actual - ultimo_guardado > intervalo_segundos and contador < limite_fotos:
            rostro_img = frame[y1:y2, x1:x2]
            if rostro_img.size > 0:
                nombre_archivo = f"{DIRECTORIO_SALIDA}/rostro_{contador + 1}.jpg"
                cv2.imwrite(nombre_archivo, rostro_img)
                contador += 1
                ultimo_guardado = tiempo_actual
                mostrar_notificacion_hasta = tiempo_actual + 1.2
                print(f"[CAPTURA {contador}/{limite_fotos}] Guardado exitoso: {nombre_archivo}")

    # Barra superior institucional (Negro y Rojo INFRAMEN)
    cv2.rectangle(frame, (0, 0), (ancho, 45), COLOR_NEGRO, -1)
    cv2.line(frame, (0, 45), (ancho, 45), COLOR_ROJO, 3)
    cv2.putText(frame, "INFRAMEN - SECCION 1-2 | VISION COMPUTACIONAL", (15, 28),
                cv2.FONT_HERSHEY_SIMPLEX, 0.65, COLOR_BLANCO, 2)

    # Contador en esquina superior derecha
    texto_contador = f"CAPTURAS: {contador}/{limite_fotos}"
    cv2.putText(frame, texto_contador, (ancho - 210, 28),
                cv2.FONT_HERSHEY_SIMPLEX, 0.60, COLOR_ROJO, 2)

    # Notificación visual sobria al tomar foto
    if tiempo_actual < mostrar_notificacion_hasta:
        cv2.rectangle(frame, (ancho // 2 - 120, 55), (ancho // 2 + 120, 90), COLOR_ROJO, -1)
        cv2.putText(frame, "FOTO REGISTRADA", (ancho // 2 - 95, 78),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.60, COLOR_BLANCO, 2)

    # Barra inferior con instrucciones
    cv2.rectangle(frame, (0, alto - 30), (ancho, alto), COLOR_NEGRO, -1)
    motor_actual = "Dlib" if HAVE_DLIB else "OpenCV Haar"
    cv2.putText(frame, f"Motor: {motor_actual} | Salir: Presione tecla 'Q'", (15, alto - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, COLOR_BLANCO, 1)

    # Renderizado de ventana
    cv2.imshow("INFRAMEN - Deteccion de Rostros (Seccion 1-2)", frame)

    tecla = cv2.waitKey(1) & 0xFF
    if tecla == ord('q') or contador >= limite_fotos:
        motivo = "Completado limite de 10 capturas" if contador >= limite_fotos else "Interrupcion voluntaria por usuario ('q')"
        print(f"\n[FINALIZADO] {motivo}.")
        break

# Liberación de recursos
cam.release()
cv2.destroyAllWindows()
print("[SISTEMA] Recursos de camara y ventanas liberados correctamente.")
