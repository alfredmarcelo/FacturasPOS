import { Text, View, StyleSheet } from 'react-native';

export default function PlanillaCotizacion({
  factura,
  subtotal,
  itbis,
  total,
  descuento,
  rnc,
  ncf,
  fecha,
  DiasVencimiento,
  nombre,
}) {
  return (
    <View style={style.Invoice}>
      {/* Encabezado */}
      <Text style={style.InvoiceTitle}>Cotizacion</Text>
      <Text style={style.InvoiceNumber}>No.</Text>

      {/* Información general */}
      <View style={style.InvoiceSection}>
        <Text style={style.InvoiceText}>Fecha: {fecha}</Text>
        <Text style={style.InvoiceText}>Cliente: {nombre} </Text>
        <Text style={style.InvoiceText}>RNC: {rnc}</Text>
        <Text style={style.InvoiceText}>Método de pago:</Text>
      </View>

      {/* Productos */}
      <View style={[style.InvoiceSection, { marginTop: 10 }]}>
        <Text style={style.SectionTitle}>Detalle de Productos</Text>
        <View style={style.TableHeader}>
          <Text style={style.Col1}>Producto</Text>
          <Text style={style.Col2}>Cant.</Text>
          <Text style={style.Col3}>Precio</Text>
          <Text style={style.Col3}>Total</Text>
        </View>

        {factura.map((item, index) => (
          <View key={index} style={style.TableRow}>
            <Text style={style.Col1}>{item.nombre}</Text>
            <Text style={style.Col2}>{item.cantidad}</Text>
            <Text style={style.Col3}>{item.precio.toFixed(2)}</Text>
            <Text style={style.Col3}>
              {(item.precio * item.cantidad).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totales */}
      <View style={[style.InvoiceSection, { marginTop: 15 }]}>
        <View style={style.Totals}>
          <Text style={style.TotalLabel}>Subtotal:</Text>
          <Text style={style.TotalValue}>{subtotal().toFixed(2)}</Text>
        </View>
        <View style={style.Totals}>
          <Text style={style.TotalLabel}>ITBIS (18%):</Text>
          <Text style={style.TotalValue}>{itbis().toFixed(2)}</Text>
        </View>
        <View style={style.Totals}>
          <Text style={style.TotalLabel}>Descuento:</Text>
          <Text style={style.TotalValue}>{descuento}</Text>
        </View>
        <View style={[style.Totals, { borderTopWidth: 1, marginTop: 5 }]}>
          <Text style={[style.TotalLabel, { fontWeight: 'bold' }]}>
            Total a pagar:
          </Text>
          <Text style={[style.TotalValue, { fontWeight: 'bold' }]}>
            {total().toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Invoice: {
    backgroundColor: '#f5f5f5',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  InvoiceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  InvoiceNumber: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10,
  },
  InvoiceSection: {
    marginBottom: 10,
  },
  InvoiceText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#333',
  },
  SectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  TableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingBottom: 3,
  },
  TableRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  Col1: { width: '25%', textAlign: 'left' },
  Col2: { width: '25%', textAlign: 'center' },
  Col3: { width: '25%', textAlign: 'right' },
  Totals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  TotalLabel: {
    fontSize: 14,
  },
  TotalValue: {
    fontSize: 14,
  },
});
