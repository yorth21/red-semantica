export function encontrarCamino(nodoInicial, nodoObjetivo) {
  const cola = [[nodoInicial]];

  while (cola.length > 0) {
    const camino = cola.shift();
    const nodoActual = camino[camino.length - 1];

    if (nodoActual === nodoObjetivo) {
      return camino;
    }

    for (const nodoRelacionado of nodoActual.relaciones) {
      if (!camino.includes(nodoRelacionado)) {
        cola.push([...camino, nodoRelacionado]);
      }
    }
  }

  return null;
}
