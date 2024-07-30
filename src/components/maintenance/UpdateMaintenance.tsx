"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Maintenance, MaintType } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";

interface UpdateMaintenancePageContentProps {
  carId: number;
  token: string;
  maintTypes: MaintType[];
  maintenance: Maintenance;
}

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UpdateMaintenancePageContent: React.FC<UpdateMaintenancePageContentProps> = ({
  carId,
  token,
  maintTypes,
  maintenance,
}) => {
  const [maintType, setMaintType] = useState<MaintType>(maintenance.maint_type);
  const [maintDate, setMaintDate] = useState(maintenance.maint_date);
  const [maintDescription, setMaintDescription] = useState(maintenance.maint_description);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedDate = new Date(maintDate).toISOString();

    const clientAPI = ClientAPI(token);

    try {
      const response = await clientAPI.maintenance.updateMaintenance({
        maint_id: maintenance.maint_id,
        car_id: carId,
        maint_type: maintType,
        maint_date: formattedDate,
        maint_description: maintDescription,
        maint_title: "",
      });

      if (response) {
        router.push(`/maintenance/${carId}/${maintType}`);
      }
    } catch (error) {
      console.error("Error updating maintenance record:", error);
    }
  };

  const handleDelete = async () => {
    const clientAPI = ClientAPI(token);

    try {
      await clientAPI.maintenance.deleteMaintenance({ maint_id: maintenance.maint_id });
      router.push(`/maintenance/${carId}/${maintenance.maint_type}`);
    } catch (error) {
      console.error("Error deleting maintenance record:", error);
    }
  };

  return (
    <Container>
      <h2>メンテナンス記録を更新</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          メンテナンスタイプ:
          <Select value={maintType} onChange={(e) => setMaintType(e.target.value as MaintType)}>
            {maintTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </Label>
        <Label>
          メンテナンス日:
          <Input
            type="date"
            value={new Date(maintDate).toISOString().split("T")[0]}
            onChange={(e) => setMaintDate(e.target.value)}
            required
          />
        </Label>
        <Label>
          メンテナンス詳細:
          <Input
            type="text"
            value={maintDescription}
            onChange={(e) => setMaintDescription(e.target.value)}
            required
          />
        </Label>
        <Button type="submit">更新</Button>
        <DeleteButton type="button" onClick={handleDelete}>削除</DeleteButton>
      </Form>
    </Container>
  );
};

export default UpdateMaintenancePageContent;
